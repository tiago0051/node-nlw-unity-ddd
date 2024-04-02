import { PrismaClient } from "@prisma/client";

export class PrismaProvider {
    public prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
}