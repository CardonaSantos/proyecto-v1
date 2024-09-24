import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LocationDto } from './dto/location.dto';
import { Server, Socket } from 'socket.io';
import { time } from 'console';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LocationGateway {
  @WebSocketServer()
  server: Server;

  private users: Map<number, string> = new Map();
  private employees: Map<number, string> = new Map();
  private admins: Map<number, string> = new Map();

  constructor(
    @Inject(forwardRef(() => LocationService))
    private readonly locationService: LocationService,
  ) {}

  // Actualizamos a los admins con los usuarios conectados
  private updateAdmins() {
    const totalConnectedUsers = this.getTotalConnectedUsers();
    const totalEmployees = this.getConnectedEmployees();
    const totalAdmins = this.getConnectedAdmins();

    const data = {
      totalConnectedUsers,
      totalEmployees,
      totalAdmins,
    };

    this.admins.forEach((socketId) => {
      this.server.to(socketId).emit('updateConnectedUsers', data);
    });
  }

  handleConnection(client: Socket) {
    const userId = this.getUserIdFromClient(client);
    const role = client.handshake.query.role as string;

    if (!isNaN(userId)) {
      if (role === 'ADMIN') {
        this.admins.set(userId, client.id);
      } else {
        this.employees.set(userId, client.id);
      }
      console.log(`${role} conectado: ${client.id} Usuario ID: ${userId}`);
    } else {
      console.log(`Cliente conectado ${client.id} Usuario ID NaN`);
    }

    this.updateAdmins(); // Notificar después de la conexión
  }

  handleDisconnect(client: Socket) {
    const userId = this.getUserIdFromClient(client);
    const role = client.handshake.query.role as string;

    if (!isNaN(userId)) {
      if (role === 'ADMIN') {
        this.admins.delete(userId);
      } else {
        this.employees.delete(userId);
      }
      console.log(`${role} desconectado: ${client.id} Usuario ID: ${userId}`);
    }

    this.updateAdmins(); // Notificar después de la desconexión
  }

  @SubscribeMessage('sendLocation')
  async handleSendLocationToAdmin(
    client: Socket,
    locationData: CreateLocationDto,
  ) {
    console.log('Ubicación recibida: ', locationData);

    // Intentar encontrar una ubicación existente para este usuario
    const existingLocation = await this.locationService.findLocationByUserId(
      locationData.usuarioId,
    );

    if (existingLocation) {
      // Si existe, actualizar el registro
      console.log(
        'Actualizando anterior registro de ubicacion de los usuarios...',
      );
      console.log('EL ID DEL REGISTRO ANTERIOR ES:  ', existingLocation.id);

      console.log('==================>');

      await this.locationService.updateLocation(
        existingLocation.id,
        locationData,
      );
    } else {
      // Si no existe, crear una nueva ubicación
      await this.locationService.createLocation(locationData);
    }

    // Enviar la ubicación solo a los administradores conectados
    this.admins.forEach((socketId) => {
      if (this.server.sockets.sockets.get(socketId)) {
        this.server.to(socketId).emit('receiveLocation', locationData);
      }
    });
  }

  private getUserIdFromClient(client: Socket): number {
    return parseInt(client.handshake.query.userId as string, 10);
  }

  getTotalConnectedUsers(): number {
    return this.admins.size + this.employees.size;
  }

  getConnectedEmployees(): number {
    return this.employees.size;
  }

  getConnectedAdmins(): number {
    return this.admins.size;
  }
}
