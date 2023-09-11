import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name:'tbespecialidade'
})
export class Especialidade {
    
    @PrimaryGeneratedColumn({
        name: 'cod_especialidade'
    })
    codigo: number

    @Column({
        name:'nm_especialidade',
        type:'varchar',
        length:55
    })
    nm_especialidade: string
}
