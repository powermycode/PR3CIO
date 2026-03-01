import { Audio, type AVPlaybackStatus } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";

export function usePlayback(onProgress?: (secondsPlayed: number, completionRate: number, completed: boolean) => void) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playsInSilentModeIOS: true
    }).catch(() => undefined);

    return () => {
      soundRef.current?.unloadAsync().catch(() => undefined);
    };
  }, []);

  const load = useCallback(
    async (source: { uri: string; headers?: Record<string, string> }) => {
      await soundRef.current?.unloadAsync();
      const { sound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: true },
        (status: AVPlaybackStatus) => {
          if (!status.isLoaded) {
            return;
          }

          const completionRate =
            status.durationMillis && status.durationMillis > 0
              ? status.positionMillis / status.durationMillis
              : 0;
          const completed = status.didJustFinish;
          onProgress?.(Math.floor(status.positionMillis / 1000), completionRate, completed);
          setIsPlaying(status.isPlaying);
        }
      );

      soundRef.current = sound;
      setIsPlaying(true);
    },
    [onProgress]
  );

  const toggle = useCallback(async () => {
    if (!soundRef.current) {
      return;
    }

    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) {
      return;
    }

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  }, []);

  return {
    isPlaying,
    load,
    toggle
  };
}
