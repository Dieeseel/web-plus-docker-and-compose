import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Wish } from "../../wishes/entities/wishes.entity";
import { Wishlist } from "../../wishlists/entities/wishlists.entity";
import { Offer } from "../../offers/entities/offers.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ unique: true })
    username: string

    @Column({ 
        default: 'Пока ничего не рассказал о себе', 
        transformer: {
            to: (value: string) => value === '' ? undefined : value,
            from: (value: string) => value,
        },
    })
    about: string

    @Column({ 
        default: 'https://i.pravatar.cc/300',  
        transformer: {
            to: (value: string) => value === '' ? undefined : value,
            from: (value: string) => value,
        },
    })
    avatar: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => Wish, (wish) => wish.owner)
    wishes: Wish[]

    @OneToMany(() => Offer, (offer) => offer.user)
    offers: Offer[]

    @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
    wishlists: Wishlist[]
}
