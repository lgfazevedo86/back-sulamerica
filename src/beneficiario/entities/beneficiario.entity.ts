import { Column, Entity } from "typeorm";

@Entity({
    name:'tbbeneficiario'
})
export class Beneficiario {
    @Column({
        name:'cpf',
        length:11,
        primary:true
    })
    cpf: string

    @Column({
        name:'nm_beneficiario',
        type:'varchar',
        length:55
    })
    nome: string 
    
    @Column({
        name:'dt_nascimento',
        type:'date',
    })
    data_nascimento: string

    
}
