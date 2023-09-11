import { Beneficiario } from "beneficiario/entities/beneficiario.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name: "tbconsulta"
})
export class Consulta {

    @PrimaryGeneratedColumn()
    cod_consulta: number

    @Column({
        name: 'cod_especialidade',
        type: 'integer',
    })
    especialidade: number

    @Column({
        name: 'cpf_beneficiario',
        type: 'varchar',
        length: 11
    })
    cpf: string

    @Column({
        name: 'data_consulta',
        type: 'date',

    })
    data: string
    @Column({
        name: 'hora_consulta',
        type: 'varchar',
        length: 5
    }) 
    hora: string
}
