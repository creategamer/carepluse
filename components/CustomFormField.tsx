
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'
import { Control } from 'react-hook-form';
import Image from "next/image";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import  E164Number  from 'react-phone-number-input'
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { format } from 'date-fns';

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}


const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return(
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
            src={props.iconSrc}
            height={24}
            width={24}
            alt={props.iconAlt || "icon"}
            className="ml-2"
            />
          )}
          <FormControl>
          <Input
              placeholder={props.placeholder}
              {...field}
              className="bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
            />
          </FormControl>
        </div>
      );

      case FormFieldType.TEXTAREA:
        return(
          <FormControl>
              <Textarea
                placeholder={props.placeholder}
                {...field}
                className="bg-dark-400 placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={props.disabled}
              />
          </FormControl>
        )
      case FormFieldType.PHONE_INPUT:
        return(
          <FormControl>
            <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            // className="input-phone"
            className="mt-2 h-11 rounded-md px-3 text -sm border bg-[#1A1D21] placeholder:text-[#76828D] border-[#363A3D]"
          />
          </FormControl>
        )
      case FormFieldType.CHECKBOX:
          return(
            <FormControl>
              <div className="flex items-center gap-4">
                <Checkbox
                  id={props.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label htmlFor={props.name} className="cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none">
                  {props.label}
                </label>
              </div>
            </FormControl>
          );
      
      // In CustomFormField.tsx - update the DATE_PICKER case
      case FormFieldType.DATE_PICKER:
        return (
          <FormControl>
            <div className="relative flex items-center">
              <Image
                src="/assets/icons/calendar.svg"
                alt="Calendar"
                width={24}
                height={24}
                className="absolute left-3 pointer-events-none"
              />
              <input
                type="datetime-local"
                id={field.name}
                value={field.value instanceof Date ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ''}
                onChange={(e) => {
                  if (e.target.value) {
                    const selectedDate = new Date(e.target.value);
                    field.onChange(selectedDate);
                  } else {
                    field.onChange(null);
                  }
                }}
                className="h-11 w-full rounded-md border-0 bg-dark-400 pl-10 pr-4 placeholder:text-dark-600 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </FormControl>
        );
            
      case FormFieldType.SELECT:
        return (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#1A1D21]  placeholder:text-[#76828D] border-dark-500 h-11 focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder={props.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-[#1A1D21] border-dark-500">
                  {props.children}
                </SelectContent>
              </Select>
          </FormControl>
        );
      case FormFieldType.SKELETON:
        return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-14-medium text-dark-700">{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField          