import relations from 'drizzle-orm'
import { pgTable, uuid, varchar, uniqueIndex } from 'drizzle-orm/pg-core'


export const UserTable = pgTable("Users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    avatar: varchar("avatar").notNull(),
    email: varchar("email", {length: 20}).notNull(),
    username: varchar("username").notNull(),
    password: varchar("password", {length: 10}).notNull()
}, (table) => {
    return {
        emailIndex: uniqueIndex("emailIndex").on(table.email)
    }
})