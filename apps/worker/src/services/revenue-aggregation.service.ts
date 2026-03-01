import { Injectable } from "@nestjs/common";
import { PrismaService } from "../infra/prisma.service";

@Injectable()
export class RevenueAggregationService {
  constructor(private readonly prisma: PrismaService) {}

  async aggregateDate(dateInput: string) {
    const date = new Date(dateInput);
    const nextDate = new Date(date);
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);

    const streamEvents = await this.prisma.streamEvent.findMany({
      where: {
        playedAt: {
          gte: date,
          lt: nextDate
        }
      },
      select: {
        trackId: true,
        userId: true,
        completionRate: true
      }
    });

    const grouped = new Map<
      string,
      {
        trackId: string;
        totalStreams: number;
        listeners: Set<string>;
        completionRateSum: number;
      }
    >();

    for (const event of streamEvents) {
      const key = event.trackId;
      const item = grouped.get(key) ?? {
        trackId: event.trackId,
        totalStreams: 0,
        listeners: new Set<string>(),
        completionRateSum: 0
      };

      item.totalStreams += 1;
      item.completionRateSum += event.completionRate;
      if (event.userId) {
        item.listeners.add(event.userId);
      }
      grouped.set(key, item);
    }

    for (const item of grouped.values()) {
      const track = await this.prisma.track.findUnique({
        where: { id: item.trackId },
        select: { artistId: true }
      });

      if (!track) {
        continue;
      }

      const completionRateAvg = item.totalStreams > 0 ? item.completionRateSum / item.totalStreams : 0;
      const revenueMicros = BigInt(Math.round(item.totalStreams * 350));

      await this.prisma.streamDailyCounter.upsert({
        where: {
          date_trackId: {
            date,
            trackId: item.trackId
          }
        },
        update: {
          totalStreams: item.totalStreams,
          uniqueListeners: item.listeners.size,
          completionRateAvg,
          revenueMicros
        },
        create: {
          date,
          trackId: item.trackId,
          artistId: track.artistId,
          totalStreams: item.totalStreams,
          uniqueListeners: item.listeners.size,
          completionRateAvg,
          revenueMicros
        }
      });
    }
  }
}
