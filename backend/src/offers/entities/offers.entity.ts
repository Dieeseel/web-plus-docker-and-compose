import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Wish } from "../../wishes/entities/wishes.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.offers)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Wish, (wish) => wish.offers)
    @JoinColumn({ name: 'item_id' })
    item: Wish

    @Column()
    amount: number

    @Column({ default: false })
    hidden: boolean
}