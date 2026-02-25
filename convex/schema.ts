import { defineSchema, defineTable } from "convex/server"; import { v } from "convex/values";
export default defineSchema({
    servers: defineTable({ name: v.string(), ip: v.string(), os: v.string(), status: v.string(), agentVersion: v.string() }).index("by_status", ["status"]),
    metrics: defineTable({ serverId: v.id("servers"), cpu: v.number(), ram: v.number(), disk: v.number(), network: v.number(), ts: v.string() }).index("by_server", ["serverId"]),
    alerts: defineTable({ serverId: v.id("servers"), rule: v.string(), current: v.string(), severity: v.string(), resolvedAt: v.optional(v.string()) }).index("by_server", ["serverId"])
});
