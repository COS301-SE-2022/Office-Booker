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
            name: 'Kryptos Kode',
            company: { connect: { id: company.id } },
            email: 'kryptoskode301@gmail.com',
            admin: true,
        },
    })

    const employee2 = await prisma.employee.create({
        data: {
            name: 'Brett du Plessis',
            company: { connect: { id: company.id } },
            email: 'duplessisbrett@icloud.com',
            admin: false,
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
            LocationCol: 10,
            LocationRow: 10,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_2 = await prisma.desk.create({
        data: {
            LocationCol: 10,
            LocationRow: 70,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_3 = await prisma.desk.create({
        data: {
            LocationCol: 400,
            LocationRow: 300,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_4 = await prisma.desk.create({
        data: {
            LocationCol: 400,
            LocationRow: 360,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_5 = await prisma.desk.create({
        data: {
            LocationCol: 400,
            LocationRow: 420,
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