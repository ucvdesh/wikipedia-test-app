import { Module } from '@nestjs/common';
import { FeedModule } from './feed/feed.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    // Configura el Throttler para una ventana de 60 segundos y un máximo de 10 solicitudes
    ThrottlerModule.forRoot([
      {
        ttl: 60, // Tiempo de ventana en segundos
        limit: 10, // Máximo de solicitudes permitidas en esa ventana
      },
    ]),
    FeedModule,
    // Otros módulos...
  ],
  providers: [
    // Aplica el guard globalmente para que todas las rutas tengan rate limiting
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
