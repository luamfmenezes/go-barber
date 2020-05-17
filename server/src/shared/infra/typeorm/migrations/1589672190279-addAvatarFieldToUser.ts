import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addAvatarFieldToUser1589672190279
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('users', 'avatar');
    }
}
