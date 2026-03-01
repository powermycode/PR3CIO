import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return {
      status: "ok",
      service: "pr3cio-api",
      ts: new Date().toISOString()
    };
  }
}
