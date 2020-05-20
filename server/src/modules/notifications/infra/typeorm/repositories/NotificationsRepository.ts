import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class NotificationsRepositories implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        //mongo is the connection name, declarated on ormconfig
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({
            content,
            recipient_id,
        });
        return notification;
    }
}

export default NotificationsRepositories;
