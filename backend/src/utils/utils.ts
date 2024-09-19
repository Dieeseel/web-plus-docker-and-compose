import * as bcrypt from 'bcrypt'

export const hashValue = (value: string) => {
    return bcrypt.hash(value, 12)
}

export const compareValue = (value: string, hash: string) => {
    return bcrypt.compare(value, hash);
}