import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // create a company
    const company = await prisma.company.create({
        data: {
            name: 'Apple',
        },
    })

    //Pseudo company called guest associated with all guest accounts
    const guest = await prisma.company.create({
        data: {
            name: 'Guest',
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
            LocationCol: 70,
            LocationRow: 10,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_3 = await prisma.desk.create({
        data: {
            LocationCol: 300,
            LocationRow: 400,
            Room: {
                connect: {
                    id: room.id,
                },
            },
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
        },
    })

    const desk_5 = await prisma.desk.create({
        data: {
            LocationCol: 420,
            LocationRow: 400,
            Room: {
                connect: {
                    id: room.id,
                },
            },
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
        },
    })

    const desk_15 = await prisma.desk.create({
        data: {
            LocationCol: 300,
            LocationRow: 360,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_16 = await prisma.desk.create({
        data: {
            LocationCol: 360,
            LocationRow: 360,
            Room: {
                connect: {
                    id: room.id,
                },
            },
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
        },
    })

    const desk_19 = await prisma.desk.create({
        data: {
            LocationCol: 420,
            LocationRow: 360,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_20 = await prisma.desk.create({
        data: {
            LocationCol: 420,
            LocationRow: 10,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_21 = await prisma.desk.create({
        data: {
            LocationCol: 480,
            LocationRow: 10,
            Room: {
                connect: {
                    id: room.id,
                },
            },
        },
    })

    const desk_22 = await prisma.desk.create({
        data: {
            LocationCol: 540,
            LocationRow: 10,
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