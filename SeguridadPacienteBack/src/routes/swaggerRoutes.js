/* eslint-disable max-len */
/**
 * @swagger
 * components:
 *  schemas:
 *    combos:
 *      type: object
 *      properties:
 *        Id:
 *          type: integer
 *          description: id del combo
 *        Descripcion:
 *          type: string
 *          description: resultado
 *    vaccinationStage:
 *      type: object
 *      properties:
 *        Id:
 *          type: integer
 *          description: id del combo
 *        Descripcion:
 *          type: string
 *          description: resultado
 *        Etapa:
 *          type: integer
 *          description: Etapa de vacunacion
 *    appliedDose:
 *      type: object
 *      properties:
 *        Id:
 *          type: integer
 *          description: id del combo
 *        Descripcion:
 *          type: string
 *          description: resultado
 *        IdBiologico:
 *          type: integer
 *          description: Id del Biologico
 *    principalForm:
 *      type: object
 *      properties:
 *        typeId:
 *          type: integer
 *          description: Tipo de ID
 *        email:
 *          type: string
 *          description: Email
 *        numberDoc:
 *          type: string
 *          description: Numero de Documento
 *        firstName:
 *          type: string
 *          description: Primer Nombre
 *        secondName:
 *          type: string
 *          description: Segundo Nombre
 *        firstSurname:
 *          type: string
 *          description: Primer Apellido
 *        secondSurname:
 *          type: string
 *          description: Segundo Apellido
 *        sex:
 *          type: string
 *          description: Sexo
 *        typeBlood:
 *          type: string
 *          description: Tipo de Sangre
 *        dateOfBirth:
 *          type: string
 *          description: Fecha de Nacimiento
 *        age:
 *          type: string
 *          description: Edad
 *        userCondition:
 *          type: boolean
 *          description: Condicion del Usuario??
 *        weeksGestation:
 *          type: string
 *          description: Semanas de Gestion
 *        birthProbDate:
 *          type: string
 *          description: Fecha Probable de Nacimiento
 *        birthPlace:
 *          type: string
 *          description: Lugar de Nacimiento
 *        otherBirthPlace:
 *          type: string
 *          description: Otro Lugar de Nacimiento
 *        disability:
 *          type: boolean
 *          description: Incapacidad
 *        displaced:
 *          type: boolean
 *          description: Desplazados
 *        armedConflict:
 *          type: boolean
 *          description: Conflicto armado
 *        dptoBirth:
 *          type: string
 *          description: Departamento de Nacimiento
 *        municipalityBirth:
 *          type: string
 *          description: Municipio de Nacimiento
 *        dptoResidence:
 *          type: string
 *          description: Departamento de Residencia
 *        municipalityResidence:
 *          type: string
 *          description: Municipio de Residencia
 *        address:
 *          type: string
 *          description: Direccion
 *        neighborhood:
 *          type: string
 *          description: Barrio
 *        eps:
 *          type: string
 *          description: EPS
 *        regimen:
 *          type: integer
 *          description: Regimen
 *        phone:
 *          type: string
 *          description: Telefono
 *        ethnicGroup:
 *          type: integer
 *          description: Grupo Etnico
 *        typeIdCarer:
 *          type: string
 *          description: Tipo de Identificacion Cuidador
 *        numberDocCarer:
 *          type: string
 *          description: Numero de documento Cuidador
 *        firstNameCarer:
 *          type: string
 *          description: Primer Nombre Cuidador
 *        secondNameCarer:
 *          type: string
 *          description: Segundo Nombre Cuidador
 *        firstSurnameCarer:
 *          type: string
 *          description: Primer Apellido Cuidador
 *        secondSurnameCarer:
 *          type: string
 *          description: Segundo Apellido Cuidador
 *        relationshipCarer:
 *          type: string
 *          description: Algo del cuidador
 *        vaccinationStage:
 *          type: integer
 *          description: Etapa de Vacunacion
 *        typePopulation:
 *          type: string
 *          description: Tipo de Poblacion
 *        biological:
 *          type: integer
 *          description: Tipo de Biologico
 *        appliedDose:
 *          type: integer
 *          description: Dosis Aplicada
 *        nameVaccinator:
 *          type: string
 *          description: Nombre Vacunador
 *        syringeType:
 *          type: integer
 *          description: Tipo de Jeringa
 *        syringeLot:
 *          type: string
 *          description: Lote de Jeringas
 *        biologicalLot:
 *          type: string
 *          description: Lote de Biologicos
 *        ips:
 *          type: integer
 *          description: IPS
 *        typist:
 *          type: string
 *          description: Digitador
 */

/**
 * @swagger
 * /v1/combos/type-id:
 *  get:
 *    summary: Devuelve los tipos de identificacion
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con los tipos de identificacion
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/regimen:
 *  get:
 *    summary: Devuelve los regimenes de afiliacion
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con los regimenes de afiliacion
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/residence-area:
 *  get:
 *    summary: Devuelve las areas de residencia
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con las areas de residencia
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/ethnic-group:
 *  get:
 *    summary: Devuelve los grupos etnicos
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con los grupos etnicos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/applied-dose:
 *  get:
 *    summary: Devuelve las dosis aplicadas
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con las dosis aplicadas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/appliedDose'
 * /v1/combos/syringe:
 *  get:
 *    summary: Devuelve los tipos de jeringa
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con los tipos de jeringa
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/biological:
 *  get:
 *    summary: Devuelve los tipos de biologicos
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con los tipos de biologicos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/vaccination-stages/{stage}:
 *  get:
 *    summary: Devuelve las etapas de vacunacion
 *    tags: [combos]
 *    parameters:
 *      - in: path
 *        name: stage
 *        schema:
 *          type: integer
 *        description: Etapa de vacunacion (1 - 5)
 *    responses:
 *      200:
 *        description: Objeto con las etapas de vacunacion
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/vaccinationStage'
 * /v1/combos/birth-place:
 *  get:
 *    summary: Devuelve los lugares de parto
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con los lugares de parto
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/departamentos/{departamento}:
 *  get:
 *    summary: Devuelve los departamentos y ciudades
 *    tags: [combos]
 *    parameters:
 *      - in: path
 *        name: departamento
 *        schema:
 *          type: string
 *        description: Devuelve lista de departamentos si el parametro se envia vacio, o lista completa si se envia "ciudades" en el parametro
 *    responses:
 *      200:
 *        description: Objeto con los departamentos o ciudades
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/health-center/eps:
 *  get:
 *    summary: Devuelve las EPS
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con las EPS
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 * /v1/combos/health-center/ips:
 *  get:
 *    summary: Devuelve las IPS
 *    tags: [combos]
 *    responses:
 *      200:
 *        description: Objeto con las IPS
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/combos'
 */
