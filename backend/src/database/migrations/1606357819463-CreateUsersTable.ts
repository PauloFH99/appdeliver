import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1606357819463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'telefone',
                    type: 'varchar',
                    isUnique: false,
                },
                {
                    name: 'cep',
                    type: 'varchar',
                    isUnique: false,
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                    isUnique: false,
                },
                {
                    name: 'rua',
                    type: 'varchar',
                    isUnique: false,
                },
                {
                    name: 'numero',
                    type: 'varchar',
                    isUnique: false,
                },
                {
                    name: 'bairro',
                    type: 'varchar',
                    isUnique: false,
                },
                {
                    name: 'cidade',
                    type: 'varchar',
                    isUnique: false,
                },
                {
                    name: 'apelido',
                    type: 'varchar',
                    isUnique: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isUnique: true,
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
