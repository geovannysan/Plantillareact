import React from "react"
import {
    Grid,
    Card,
    CardContent,
    MenuItem,
    InputLabel,
    Select,
    CardActions,
    Button,
    CardHeader,
    FormControl,
} from "@mui/material"

import { Formik, Form, Field, useField } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"
import { EnviaWhast, Guardarsolicitud } from "../../utils/Query"


const MyTextArea = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="text-area" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};
//Data
const initialValues = {
    Nombre: "",
    cedula: "",
    Tipo: "",
    cantiadad: "",
    Prioridad: "",
    asunto: ""
}

const options = [
    { label: "Anticipo", value: "Anticipo" },
    { label: "Permiso ", value: "Permiso" },
    { label: "Trabajos", value: "Trabajos" },
]
const Prioridad = [
    { label: "Baja", value: "Baja" },
    { label: "Alta ", value: "Alta" },
    { label: "Urgente ", value: "Urgente" },
]

//password validation
const lowercaseRegEx = /(?=.*[a-z])/
const uppercaseRegEx = /(?=.*[A-Z])/
const numericRegEx = /(?=.*[0-9])/
const lengthRegEx = /(?=.{6,})/

//validation schema
let validationSchema = Yup.object().shape({
    Nombre: Yup.string().required("Required"),
    cedula: Yup.string().required("Required"),
    cantiadad: Yup.string().required("Required"),
    Prioridad: Yup.string().required("Required"),
    asunto: Yup.string().required("Required"),
    Tipo: Yup.string().required("Required")

})

const UserForm = () => {


    const onSubmit = (values, { resetForm }) => {
        console.log(values)
        let parms = {
            fecha: new Date(),
            estado: "Pendiente",
            observacion: "",
            ...values
        }
        Guardarsolicitud(parms).then(oup => {
            console.log(oup)
            if (oup.status) {
                resetForm();
                let informa = {
                    "user_id": "593997804922",
                    "message": "Nueva solicitud registrada: " + values.Nombre + "" + values.cedula + "\n" + values.asunto,
                }
                EnviaWhast(informa).then(o => {
                    console.log(o)
                })
                alert("Solicitud registrada\n Espere a que la accesora se comunique")
            }
        }).catch(err => {
            console.log(err)
        })

    }

    const PermisoView = (values) => {
        return (
            <CardContent>
                <Grid item container spacing={1} justify="center">

                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Nombre Completos"}
                            variant="outlined"
                            fullWidth
                            name="Nombre"
                            value={values.Nombre}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Documento de identificación"}
                            variant="outlined"
                            fullWidth
                            type={"number"}
                            name="cedula"
                            value={values.cedula}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Cargo que Ocupa"}
                            variant="outlined"
                            fullWidth
                            type={"nmber"}
                            name="cargo"
                            value={values.cargo}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Area o proceso de trabajo"}
                            variant="outlined"
                            fullWidth
                            type={""}
                            name="area"
                            value={values.area}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Oficiona/secion"}
                            variant="outlined"
                            fullWidth
                            type={""}
                            name="oficina"
                            value={values.oficina}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Teléfono"}
                            variant="outlined"
                            fullWidth
                            type={""}
                            name="telefono"
                            value={values.telefono}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>

                        <label>Desde </label>
                        <Field
                            variant="outlined"
                            fullWidth
                            name="inicio"
                            type="datetime-local"
                            value={values.inicio}
                            component={TextField}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <label>Hasta</label>
                        <Field
                            label=""
                            variant="outlined"
                            type="datetime-local"
                            fullWidth
                            name="fin"
                            value={values.fin}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <label>Reintegro</label>
                        <Field
                            label=""
                            variant="outlined"
                            type="datetime-local"
                            fullWidth
                            name="regreso"
                            value={values.regreso}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <label>Motivo </label>
                        <MyTextArea
                            rows="5"
                            name="asunto"
                            value={values.asunto}
                            placeholder={"Por favor detalle el motivo de su solicitud "}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                                Tipo
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                label="aprobador"
                                value={values.aprobador}
                                name="aprobador">
                                <MenuItem >none</MenuItem>
                                <MenuItem value={"Sra. Irene"}>
                                    Sra. Irene
                                </MenuItem>
                                <MenuItem value={"Don Carlos"}>
                                    Don Carlos
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </CardContent>
        )
    }
    const PrestamoView = (values) => {
        return (
            <CardContent>
                <Grid item container spacing={1} justify="center">

                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Nombre Completos"}
                            variant="outlined"
                            fullWidth
                            name="Nombre"
                            value={values.Nombre}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Documento de identificación"}
                            variant="outlined"
                            fullWidth
                            type={"number"}
                            name="cedula"
                            value={values.cedula}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Cargo que Ocupa"}
                            variant="outlined"
                            fullWidth
                            type={"nmber"}
                            name="cargo"
                            value={values.cargo}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Area o proceso de trabajo"}
                            variant="outlined"
                            fullWidth
                            type={""}
                            name="area"
                            value={values.area}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Oficiona/secion"}
                            variant="outlined"
                            fullWidth
                            type={""}
                            name="oficina"
                            value={values.oficina}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Teléfono"}
                            variant="outlined"
                            fullWidth
                            type={""}
                            name="telefono"
                            value={values.telefono}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Tipo de contrato"}
                            variant="outlined"
                            fullWidth
                            type={""}
                            name="contrato"
                            value={values.contrato}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Field
                            label={"Fecha de ingreso"}
                            variant="outlined"
                            fullWidth
                            type={""}
                            name="ingreso"
                            value={values.ingreso}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>

                        <label>Monto </label>
                        <Field
                            variant="outlined"
                            fullWidth
                            name="monto"
                            type="number"
                            value={values.monto}
                            component={TextField}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <label>Cuotas</label>
                        <Field
                            label="Numero de cuotas"
                            variant="outlined"
                            type="number"
                            fullWidth
                            name="cuotas"
                            value={values.cuotas}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <div className="row">
                            <div className="col-6">
                                Maque la casialla
                            </div>
                            <div className="col-3">
                                <Grid   >
                                    <label>Quincena</label>
                                    <Field
                                        label=""
                                        variant="outlined"
                                        type="checkbox"
                                        fullWidth
                                        name="quincena"
                                        value={values.quincena}

                                    />
                                </Grid>
                            </div>
                            <div className="col-3">
                                <Grid   >
                                    <label>Fin de mes</label>
                                    <Field
                                        label=""
                                        variant="outlined"
                                        type="checkbox"
                                        fullWidth
                                        name="finmes"
                                        value={values.finmes}

                                    />
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <label>Descontar desde</label>
                        <Field
                            label=""
                            variant="outlined"
                            type="datetime-local"
                            fullWidth
                            name="desde"
                            value={values.desde}
                            component={TextField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <label>Motivo </label>
                        <MyTextArea
                            rows="5"
                            name="asunto"
                            value={values.asunto}
                            placeholder={"Por favor detalle el motivo de su solicitud "}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                                Aprobado por
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                label="aprobador"
                                value={values.aprobador}
                                name="aprobador">
                                <MenuItem >none</MenuItem>
                                <MenuItem value={"Sra. Irene"}>
                                    Sra. Irene
                                </MenuItem>
                                <MenuItem value={"Don Carlos"}>
                                    Don Carlos
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </CardContent>
        )
    }
    
    return (

        <Grid item md={6}>
            <Card >
                <CardHeader title="REGISTRAR SOLICITUD"></CardHeader>
                <div className="">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {({ dirty, isValid, values, handleChange, handleBlur }) => {
                            return (
                                <Form>
                                    <CardContent>
                                        <Grid item container spacing={1} justify="center">
                                            <Grid item xs={12} sm={6} md={12}>
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        Tipo
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Tipo"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.occupation}
                                                        name="Tipo">
                                                        <MenuItem >none</MenuItem>
                                                        {options.map((item) => (
                                                            <MenuItem key={item.value} value={item.value}>
                                                                {item.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Field
                                                    label={values.Tipo == "Trabajos" ? "EMPLEADOS" : "Nombre"}
                                                    variant="outlined"
                                                    fullWidth
                                                    name="Nombre"
                                                    value={values.Nombre}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                <Field
                                                    label={values.Tipo == "Trabajos" ? "RESPONSABLE" : "CÉDULA"}
                                                    variant="outlined"
                                                    fullWidth
                                                    type={values.Tipo == "Trabajos" ? "" : "number"}
                                                    name="cedula"
                                                    value={values.cedula}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                {values.Tipo == "Trabajos" ? <label>hora de inicio</label> :
                                                    <label>Digíte la cantidad</label>}
                                                {values.Tipo == "Trabajos" ?
                                                    <Field
                                                        variant="outlined"
                                                        fullWidth
                                                        name="cantiadad"
                                                        type="datetime-local"
                                                        value={values.cantiadad}
                                                        component={TextField}
                                                    />
                                                    :
                                                    <Field
                                                        label={values.Tipo == "Anticipo" ? "cantidad" : "# de días"}
                                                        variant="outlined"
                                                        fullWidth
                                                        name="cantiadad"
                                                        value={values.cantiadad}
                                                        component={TextField}
                                                    />}
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={6}>
                                                {values.Tipo == "Trabajos" ? <label>hora de cierre</label> : <label>Fecha requerida</label>}

                                                <Field
                                                    label=""
                                                    variant="outlined"
                                                    type="datetime-local"
                                                    fullWidth
                                                    name="Prioridad"
                                                    value={values.Prioridad}
                                                    component={TextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <label>Asunto </label>
                                                <MyTextArea
                                                    rows="5"
                                                    name="asunto"
                                                    value={values.asunto}
                                                    placeholder={values.Tipo == "Trabajos" ? "Por favor detalle todas las personas que realizaran el trabajo" : "Por favor detalle su solicitud "}
                                                />                                            
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Button
                                            disabled={!dirty || !isValid}
                                            variant="contained"
                                            color="primary"
                                            type="Submit"
                                        >
                                            REGISTRAR
                                        </Button>
                                    </CardActions>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>

                <div className="row">

                </div>
            </Card>
        </Grid>

    )
}

export default UserForm
