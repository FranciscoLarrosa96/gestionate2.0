

export class Perfil { // de Colaborador

    idColaborador: string;
    idLegajo: string;
    legajo: string;
    nombre: string;
    nombreCorto: string;
    codEmpresa: string;
    empresa: string;
    departamento: string;
    lugarTrabajo: string;
    fechaIngreso: string;
    fechaEgreso: string;
    telefonos: string;
    fechaNacimiento: string;
    dni: string;
    domicilio: string;
    localidad: string;
    tarea: string;
    cuil: string;
    email: string;
    sexo: string;
    estadoCivil: string;
    observaciones: string;
    jefe: string;
    historialNovedades: [];
    novedadesActuales: [];
    isSelected: boolean;
    codOrigen: string;

    // No vienen en el response por el momento
    img: string;
    cantNovedadesUltimoMes: number;
    estado: string;

    // Para el Filtro de Responsable NOV 
    sector: string;

    cod_categoria: string;
    desc_categoria: string;
    horas_por_dia: number;
    jornada: string;
    /**
     * Constructor
     *
     * @param perfil
     */
    constructor(perfil: any) {
        this.idColaborador = perfil.idColaborador || '-';
        this.idLegajo = perfil.idLegajo || '-';
        this.legajo = perfil.legajo || '-';
        this.nombre = perfil.nombre || '';
        this.nombreCorto = perfil.nombreCorto || '';
        this.codEmpresa = perfil.codEmpresa || '-';
        this.empresa = perfil.empresa || '-';
        this.departamento = perfil.departamento || '-';
        this.lugarTrabajo = perfil.lugarTrabajo || '-';
        this.fechaIngreso = perfil.fechaIngreso || '';
        this.fechaEgreso = perfil.fechaEgreso || '';
        this.telefonos = perfil.telefonos || '-';
        this.fechaNacimiento = perfil.fechaNacimiento || '';
        this.dni = perfil.dni || '';
        this.domicilio = perfil.domicilio || '-';
        this.localidad = perfil.localidad || '-';
        this.tarea = perfil.tarea || '-';
        this.cuil = perfil.cuil || '-';
        this.email = perfil.email || '-';
        this.sexo = perfil.sexo || 'Masculino';
        this.estadoCivil = perfil.estadoCivil || '-';
        this.observaciones = perfil.observaciones || '-';
        this.jefe = perfil.jefe || '';
        this.novedadesActuales = perfil.novedadesActuales || [];
        this.historialNovedades = perfil.historialNovedades || [];
        this.isSelected = perfil.isSelected || null;
        this.codOrigen = perfil.codOrigen;
        if (this.sexo === 'Femenino') {
            this.img = perfil.img || 'assets/images/avatars/avatarF.png';
        } else {
            this.img = perfil.img || 'assets/images/avatars/avatarM.png';
        }
        this.cantNovedadesUltimoMes = perfil.cantNovedadesUltimoMes || 0;
        this.sector = perfil.sector || '';
        this.estado = perfil.estado || '';
        this.cod_categoria = perfil.cod_categoria || '';
        this.desc_categoria = perfil.desc_categoria || '';
        this.horas_por_dia = perfil.horas_por_dia || 0;
        this.jornada = perfil.jornada;
    }

    /**
     * Determina si this es un perfil creado por defecto.
     */
    public isDefault(): boolean {
        if ((this.idColaborador == '-') && (this.idLegajo == '-') && (this.legajo == '-') && (this.nombre == '') && (this.nombreCorto == '') && (this.codEmpresa == '-')
            && (this.empresa == '-') && (this.departamento == '-') && (this.lugarTrabajo == '-') && (this.fechaIngreso == '') && (this.fechaEgreso == '') && (this.telefonos == '-')
            && (this.fechaNacimiento == '') && (this.dni == '') && (this.domicilio == '-') && (this.localidad == '-') && (this.tarea == '-') && (this.cuil == '-')
            && (this.email == '-') && (this.sexo == 'Masculino') && (this.estadoCivil == '-') && (this.observaciones == '-') && (this.jefe == '')
            && (this.novedadesActuales.length == 0) && (this.historialNovedades.length == 0) && (this.cantNovedadesUltimoMes == 0) && (this.sector == '') && (this.estado == '')
            && (this.cod_categoria == '') && (this.desc_categoria == '') && (this.horas_por_dia == 0)
        ) {
            return true;
        }
        return false;
    }




}