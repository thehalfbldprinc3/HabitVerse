// src/server/api/routers/group.ts
import { router, publicProcedure } from "@/server/trpc";
import { db } from "@/server/db";
import {
  groupCreateSchema,
  groupUpdateSchema,
  groupIdSchema,
} from "@/shared/schemas/group";
import { z } from "zod";

export const groupRouter = router({
  create: publicProcedure
    .input(groupCreateSchema)
    .mutation(async ({ input }) => {
      try {
        const group = await db.group.create({ data: input });
        return group;
      } catch (err) {
        console.error("Group create failed:", err);
        throw new Error("Failed to create group");
      }
    }),

  getAll: publicProcedure.query(async () => {
    try {
      return await db.group.findMany({
        orderBy: { createdAt: "desc" },
        include: { members: true, habits: true },
      });
    } catch (err) {
      console.error("Group fetch failed:", err);
      throw new Error("Failed to fetch groups");
    }
  }),

  getById: publicProcedure
    .input(groupIdSchema)
    .query(async ({ input }) => {
      try {
        return await db.group.findUnique({
          where: { id: input.id },
          include: { members: true, habits: true },
        });
      } catch (err) {
        console.error("Group by ID fetch failed:", err);
        throw new Error("Failed to fetch group by ID");
      }
    }),

  update: publicProcedure
    .input(groupUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      try {
        const updated = await db.group.update({
          where: { id },
          data,
        });
        return updated;
      } catch (err) {
        console.error("Group update failed:", err);
        throw new Error("Failed to update group");
      }
    }),

  delete: publicProcedure
    .input(groupIdSchema)
    .mutation(async ({ input }) => {
      try {
        await db.groupMember.deleteMany({ where: { groupId: input.id } });
        await db.groupHabit.deleteMany({ where: { groupId: input.id } });

        const deleted = await db.group.delete({ where: { id: input.id } });
        return deleted;
      } catch (err) {
        console.error("Group delete failed:", err);
        throw new Error("Failed to delete group");
      }
    }),
});