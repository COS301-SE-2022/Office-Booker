import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // create a company
    const company = await prisma.company.create({
        data: {
            name: 'Apple',
        },
    })

    const employee1 = await prisma.employee.create({
        data: {
            name: 'Steve Jobs',
            company: { connect: { id: company.id } },
        },
    })

    const employee2 = await prisma.employee.create({
        data: {
            name: 'Bill Gates',
            company: { connect: { id: company.id } },
        },
    })


    // create a room
    const room = await prisma.room.create({
        data: {
            name: 'Main Room',
            Company: { connect: { id: company.id } },
        },
    })

    const desk_1 = await prisma.desk.create({
        data: {
            LocationCol: 1,
            LocationRow: 1,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_2 = await prisma.desk.create({
        data: {
            LocationCol: 2,
            LocationRow: 2,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const facility_1 = await prisma.facility.create({
        data: {
            name: "Plug",
            count: 1,
            Desk: {
                connect: {
                    id: desk_1.id,
                }
            }
        }
    })

    const facility_2 = await prisma.facility.create({
        data: {
            name: "Plug",
            count: 2,
            Desk: {
                connect: {
                    id: desk_2.id,
                }
            }
        }
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })