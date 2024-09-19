import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length,  } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { Offer } from "../../offers/entities/offers.entity";

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    name: string
    
    @Column()
    link: string

    @Column()
    image: string

    @Column({ type: 'decimal', scale: 2 })
    price: number

    @Column({ type: 'decimal', scale: 2, default: 0 })
    raised: number

    @ManyToOne(() => User, (user) => user.wishes)
    @JoinColumn({ name: 'owner_id' })
    owner: User

    @Column()
    @Length(1, 1024)
    description: string

    @OneToMany(() => Offer, (offer) => offer)
    offers: Offer[]  

    @Column({ default: 0 })
    copied: number
}
