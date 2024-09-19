import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsUrl, Length } from "class-validator"
import { User } from "../../users/entities/user.entity";
import { Wish } from "../../wishes/entities/wishes.entity";


@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    @Length(1, 250)
    name: string

    // @Column()
    // @IsOptional()
    // @Max(1500)
    // description: string

    @Column()
    @IsUrl()
    image: string

    @ManyToOne(() => User, (user) => user.wishlists)
    @JoinColumn({ name: 'owner_id' })
    owner: User

    @ManyToMany(() => Wish)
    @JoinTable()
    items: Wish[]
}
