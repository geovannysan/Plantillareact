import React from "react";
import PropTypes from "prop-types";
import { zonedTimeToUtc, utcToZonedTime, toDate,format } from "date-fns-tz";
import { DateTimePicker, DatePicker, TimePicker } from "@material-ui/pickers";

const componentTypes = {
    datetime: DateTimePicker,
    date: DatePicker,
    time: TimePicker
};

const timezoneList = {
    losAngeles: "America/Los_Angeles", // -8:00 (-7)
    berlin: "Europe/Berlin", // +2:00 (-1)
    newYork: "America/New_York", // -5:00 (-4)
    perth: "Australia/Perth", // +8:00
    tongatapu: "Pacific/Tongatapu", // +13:00 (+14)
    djibouti: "Africa/Djibouti", // +3:00
    kamkchatka: "Asia/Kamchatka" // + 12:00
};
const timezone = timezoneList.kamkchatka;

const initialValues = {
    // Day after DST shift in America: NY (-4), LA (-7)
    dateTime: "2021-09-08T14:30:00.000Z",

    // Day after DST shift in America: NY (-5), LA (-8)
    // dateTime: "2019-11-04T12:00:00.000Z",

    // Day after DST shift in Australia Perth (+9) Historic
    // dateTime: "2009-03-01T12:00:00.000Z",

    // Day after DST shift in Australia: Perth (+8) Historic
    // dateTime: "2009-03-30T12:00:00.000Z",

    dateTimeLinked: "2019-03-01T12:00:00.000Z",
    date: "2019-06-12",
    staticDateTime: "2019-06-12T14:56:28.176",
    staticDateTimeLinked: "2005-08-31T13:55:49",
    staticDate: "1980-02-24",
    staticTime: "09:35:20"
};

console.log(
    format(utcToZonedTime(initialValues.dateTimeLinked, timezone), "PPPppp", {})
);

const mb = { marginBottom: 8 };

const isoDateRegExp = /^(\d{1,})-?(\d{2})?-?(\d{2})T?(\d{2})?:?(\d{2})?:?(\d{2})?\.?(\d{3})?(Z|[+-]\d{2}:\d{2})?/;
const timeRegExp = /^(\d{2}):(\d{2}):?(\d{2})?\.?(\d{3})?/;

const getDateForPicker = (str, timezone) => {
    if (isoDateRegExp.test(str)) {
        return timezone ? utcToZonedTime(new Date(str), timezone) : toDate(str);
    } else if (timeRegExp.test(str)) {
        const date = new Date();
        const utcDateISOString = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        ).toISOString();
        return toDate(
            utcDateISOString.substring(0, utcDateISOString.indexOf("T") + 1) + str
        );
    }
    return null;
};
 
const FormikFieldDateTimePicker = ({
    field,
    form,
    type,
    timezone,
    returnDateOnly,
    ...restProps
}) => {
    const CustomTag = componentTypes[type];
    const currentError = form.errors[field.name];

    const pickerValue = getDateForPicker(field.value, timezone);

    const handleChange = date => {
        if (date === null) {
            form.setFieldValue(field.name, null, true);
            return;
        }

        let storedValue;
        if (timezone) {
            storedValue = zonedTimeToUtc(date, timezone).toISOString();
            storedValue = returnDateOnly
                ? storedValue.substring(0, storedValue.indexOf("T"))
                : storedValue;
        } else {
            const utcDateIsoString = new Date(
                Date.UTC(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getMilliseconds()
                )
            ).toISOString();

            if (isoDateRegExp.test(field.value)) {
                storedValue = !returnDateOnly
                    ? utcDateIsoString.substring(0, utcDateIsoString.indexOf("Z"))
                    : utcDateIsoString.substring(0, utcDateIsoString.indexOf("T"));
            } else {
                storedValue = utcDateIsoString.substring(
                    utcDateIsoString.indexOf("T") + 1,
                    utcDateIsoString.indexOf("Z")
                );
            }
        }
        form.setFieldValue(field.name, storedValue, true);
    };

    const handleBlur = e => {
        field.onBlur(e);
    };

    return (
        <CustomTag
            name={field.name}
            value={pickerValue}
            helperText={currentError}
            error={Boolean(currentError)}
            onError={(_, error) => form.setFieldError(field.name, error)}
            onChange={handleChange}
            onBlur={handleBlur}
            {...restProps}
        />
    );
};

FormikFieldDateTimePicker.propTypes = {
    field: PropTypes.shape().isRequired,
    form: PropTypes.shape().isRequired,
    type: PropTypes.oneOf(["datetime", "date", "time"]),
    timezone: PropTypes.string,
    returnDateOnly: PropTypes.bool
};

FormikFieldDateTimePicker.defaultProps = {
    type: "datetime",
    returnDateOnly: false
};

export default FormikFieldDateTimePicker;
