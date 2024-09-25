import { pgTable, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { relations, eq } from "drizzle-orm";

export const VideoTable = pgTable(
  "videotable",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    title: varchar("title").notNull(),
    url: varchar("url").notNull(),
    description: varchar("description").notNull(),
  },
  (table) => {
    return {
      urlIndex: uniqueIndex("urlIndex").on(table.url),
    };
  }
);

export const ImagesForVideoTable = pgTable("imageforvideotable", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  image: varchar("image").notNull(),
  videoId: uuid("videoId")
    .references(() => VideoTable.id)
    .notNull(),
});

// RELATIONS

export const VideoTableRelations = relations(VideoTable, ({ many }) => {
  return {
    images: many(ImagesForVideoTable),
  };
});

export const ImagesForVideoTableRelations = relations(
  ImagesForVideoTable,
  ({ one }) => {
    return {
      image: one(VideoTable, {
        fields: [ImagesForVideoTable.videoId],
        references: [VideoTable.id],
      }),
    };
  }
);
