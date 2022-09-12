import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // create a company
    const company = await prisma.company.create({
        data: {
            name: 'Apple',
            domain: 'apple.com',
        },
    })

    //Pseudo company called guest associated with all guest accounts
    /*const guest = await prisma.company.create({
        data: {
            name: 'Guest',
        },
    })*/

    const employee1 = await prisma.employee.create({
        data: {
            name: 'Kryptos Kode',
            company: { connect: { id: company.id } },
            email: 'kryptoskode301@gmail.com',
            admin: true,
            guest: false,
            currentRating: 4,
            ratingsReceived: 10,
        },
    })

    const employee2 = await prisma.employee.create({
        data: {
            name: 'Brett du Plessis',
            company: { connect: { id: company.id } },
            email: 'duplessisbrett@icloud.com',
            admin: false,
            guest: false,
            currentRating: 3,
            ratingsReceived: 5,
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
            LocationCol: 0,
            LocationRow: 0,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 200,
            Height: 200,
            isMeetingRoom: true,
            capacity: 10,
        },
    })

    const desk_2 = await prisma.desk.create({
        data: {
            LocationCol: 540,
            LocationRow: 0,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 300,
            Height: 200,
            isMeetingRoom: true,
            capacity: 10,
        },
    })

    const desk_3 = await prisma.desk.create({
        data: {
            LocationCol: 0,
            LocationRow: 210,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 200,
            Height: 250,
            isMeetingRoom: true,
            capacity: 15,
        },
    })

    const desk_4 = await prisma.desk.create({
        data: {
            LocationCol: 360,
            LocationRow: 400,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 30,
            Height: 50,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_5 = await prisma.desk.create({
        data: {
            LocationCol: 400,
            LocationRow: 400,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 30,
            Height: 50,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_6 = await prisma.desk.create({
        data: {
            LocationCol: 740,
            LocationRow: 510,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_7 = await prisma.desk.create({
        data: {
            LocationCol: 680,
            LocationRow: 510,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_8 = await prisma.desk.create({
        data: {
            LocationCol: 620,
            LocationRow: 510,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_9 = await prisma.desk.create({
        data: {
            LocationCol: 740,
            LocationRow: 460,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_10 = await prisma.desk.create({
        data: {
            LocationCol: 680,
            LocationRow: 460,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_11 = await prisma.desk.create({
        data: {
            LocationCol: 620,
            LocationRow: 460,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_12 = await prisma.desk.create({
        data: {
            LocationCol: 740,
            LocationRow: 760,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_13 = await prisma.desk.create({
        data: {
            LocationCol: 680,
            LocationRow: 760,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_14 = await prisma.desk.create({
        data: {
            LocationCol: 620,
            LocationRow: 760,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_15 = await prisma.desk.create({
        data: {
            LocationCol: 360,
            LocationRow: 340,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 30,
            Height: 50,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_16 = await prisma.desk.create({
        data: {
            LocationCol: 400,
            LocationRow: 340,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 30,
            Height: 50,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_17 = await prisma.desk.create({
        data: {
            LocationCol: 10,
            LocationRow: 760,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_18 = await prisma.desk.create({
        data: {
            LocationCol: 70,
            LocationRow: 760,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_19 = await prisma.desk.create({
        data: {
            LocationCol: 360,
            LocationRow: 280,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 30,
            Height: 50,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_20 = await prisma.desk.create({
        data: {
            LocationCol: 250,
            LocationRow: 10,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_21 = await prisma.desk.create({
        data: {
            LocationCol: 310,
            LocationRow: 10,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_22 = await prisma.desk.create({
        data: {
            LocationCol: 370,
            LocationRow: 10,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 50,
            Height: 30,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_23 = await prisma.desk.create({
        data: {
            LocationCol: 400,
            LocationRow: 280,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 30,
            Height: 50,
            isMeetingRoom: false,
            capacity: 1,
        },
    })

    const desk_24 = await prisma.desk.create({
        data: {
            LocationCol: 300,
            LocationRow: 600,
            Room: {
                connect: {
                    id: room.id,
                },
            },
            Width: 200,
            Height: 200,
            isMeetingRoom: true,
            capacity: 10,
        },
    })

    const facility_1 = await prisma.facility.create({
        data: {
            Desk: {
                connect: {
                    id: desk_1.id,
                }
            },
            plugs: 1,
            monitors: 1,
            projectors: 0,
        }
    })

    const facility_2 = await prisma.facility.create({
        data: {
            Desk: {
                connect: {
                    id: desk_2.id,
                }
            },
            plugs: 2,
            monitors: 1,
            projectors: 0,
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