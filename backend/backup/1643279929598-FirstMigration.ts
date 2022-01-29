import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1643279929598 implements MigrationInterface {
    name = 'FirstMigration1643279929598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`productcategory\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isArchived\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`productCategoryName\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`currency\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isArchived\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`currencyName\` varchar(100) NOT NULL, \`iso4217Iso\` char(3) NOT NULL, UNIQUE INDEX \`IDX_1ac8cdc33dbe724b4cdfdd619b\` (\`iso4217Iso\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isArchived\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`partNumber\` varchar(50) NOT NULL, \`name\` varchar(100) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`currencyId\` varchar(255) NOT NULL, \`description\` text NULL, \`productCategoryId\` varchar(255) NOT NULL, \`imageFile\` varchar(250) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoiceline\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isArchived\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`invoiceId\` varchar(255) NOT NULL, \`productId\` varchar(255) NOT NULL, \`lineText\` text NULL, \`price\` decimal(10,2) NOT NULL, \`quantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoice\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isArchived\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`customerId\` varchar(255) NOT NULL, \`invoiceNumber\` int NOT NULL, \`paid\` tinyint(1) NOT NULL, \`paidDate\` datetime NULL, \`dueDate\` datetime NOT NULL, \`comment\` text NULL, \`name\` varchar(100) NOT NULL, \`address\` varchar(100) NOT NULL, \`zipCode\` varchar(100) NOT NULL, \`city\` varchar(100) NOT NULL, \`country\` varchar(255) NOT NULL, \`currencyId\` varchar(36) NULL, \`invoicelinesId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` varchar(36) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isArchived\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleteAt\` datetime(6) NULL, \`firstName\` varchar(100) NOT NULL, \`lastName\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NULL, \`address\` varchar(100) NULL, \`zipCode\` varchar(100) NULL, \`city\` varchar(100) NULL, \`country\` varchar(255) NULL, \`phone\` varchar(50) NULL, UNIQUE INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_618194d24a7ea86a165d7ec628e\` FOREIGN KEY (\`productCategoryId\`) REFERENCES \`productcategory\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_498f0ae3619a8e1f2f42434a4f7\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` ADD CONSTRAINT \`FK_b75db7b08588ef12058acccf29f\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` ADD CONSTRAINT \`FK_2c4c352b8437f44f915f8d08468\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_45184bf71860b1e17cb683b746c\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_925aa26ea12c28a6adb614445ee\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_a763ebbb7941d0ae238e803e039\` FOREIGN KEY (\`invoicelinesId\`) REFERENCES \`invoiceline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_a763ebbb7941d0ae238e803e039\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_925aa26ea12c28a6adb614445ee\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_45184bf71860b1e17cb683b746c\``);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` DROP FOREIGN KEY \`FK_2c4c352b8437f44f915f8d08468\``);
        await queryRunner.query(`ALTER TABLE \`invoiceline\` DROP FOREIGN KEY \`FK_b75db7b08588ef12058acccf29f\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_498f0ae3619a8e1f2f42434a4f7\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_618194d24a7ea86a165d7ec628e\``);
        await queryRunner.query(`DROP INDEX \`IDX_fdb2f3ad8115da4c7718109a6e\` ON \`customer\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`invoice\``);
        await queryRunner.query(`DROP TABLE \`invoiceline\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_1ac8cdc33dbe724b4cdfdd619b\` ON \`currency\``);
        await queryRunner.query(`DROP TABLE \`currency\``);
        await queryRunner.query(`DROP TABLE \`productcategory\``);
    }

}
