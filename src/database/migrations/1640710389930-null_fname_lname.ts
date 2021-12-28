import {MigrationInterface, QueryRunner} from "typeorm";

export class nullFnameLname1640710389930 implements MigrationInterface {
    name = 'nullFnameLname1640710389930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL`);
    }

}
