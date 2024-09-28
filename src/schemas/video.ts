import { pgTable, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { relations, eq } from "drizzle-orm";


export const ImagesForVideoTable = pgTable("Imageforvideotable", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  image: varchar("image").notNull().unique(),
  
});


export const VideoTable = pgTable(
  "Videotable",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    title: varchar("title").notNull(),
    url: varchar("url").notNull(),
    description: varchar("description").notNull(),
    imageId: uuid("imageId")
    .references(() => ImagesForVideoTable.id)
    .notNull(),
  },
  (table) => {
    return {
      urlIndex: uniqueIndex("urlIndex").on(table.url),
    };
  }
);

// RELATIONS

export const ImagesForVideoTableRelations = relations(ImagesForVideoTable, ({ many }) => {
  return {
    videos: many(VideoTable),
  };
});

export const VideoTableRelations = relations(
  VideoTable,
  ({ one }) => {
    return {
      image: one(ImagesForVideoTable, {
        fields: [VideoTable.imageId],
        references: [ImagesForVideoTable.id],
      }),
    };
  }
);
