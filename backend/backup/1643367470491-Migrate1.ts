import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrate11643367470491 implements MigrationInterface {
    name = 'Migrate11643367470491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`productcategory\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`productcategory\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`productcategory\` DROP COLUMN \`deleteAt\``);
        await queryRunner.query(`ALTER TABLE \`currency\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`currency\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`currency\` DROP COLUMN \`deleteAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`deleteAt\``);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` DROP COLUMN \`deleteAt\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`deleteAt\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`createAt\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`deleteAt\``);
        await queryRunner.query(`ALTER TABLE \`productcategory\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`productcategory\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`productcategory\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`currency\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`currency\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`currency\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`currency\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`currency\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`currency\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`productcategory\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`productcategory\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`productcategory\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`deleteAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`deleteAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` ADD \`deleteAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`deleteAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`currency\` ADD \`deleteAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`currency\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`currency\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`productcategory\` ADD \`deleteAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`productcategory\` ADD \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`productcategory\` ADD \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
