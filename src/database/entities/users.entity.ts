import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { hash, compare } from 'bcryptjs';

@Entity()
export class Users{

  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ type: 'varchar', nullable: true }) firstName: string;

  @Column({ type: 'varchar', nullable: true }) lastName: string;

  @Column({ type: 'varchar', nullable: false }) email: string;

  @Column({ type: 'varchar', nullable: false }) password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }

}