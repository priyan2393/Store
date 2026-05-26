"use client"

import { useState } from "react"
import { MapPin, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
]

export interface AddressFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pincode: string
}

const SAVED_ADDRESS: AddressFormValues = {
  firstName: "Arjun",
  lastName: "Mehta",
  email: "arjun.mehta@email.com",
  phone: "9876543210",
  addressLine1: "42, Pali Hill Road",
  addressLine2: "Near Bandra West Metro",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400050",
}

const EMPTY_ADDRESS: AddressFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
}

interface InputFieldProps {
  label: string
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  maxLength?: number
  pattern?: string
}

function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  maxLength,
  pattern,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-sans tracking-[0.12em] uppercase text-foreground"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        pattern={pattern}
        className="h-11 border border-border bg-background px-3 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
      />
    </div>
  )
}

interface SelectFieldProps {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  required?: boolean
}

function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  required,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-sans tracking-[0.12em] uppercase text-foreground"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="appearance-none w-full h-11 border border-border bg-background px-3 text-sm font-sans text-foreground focus:outline-none focus:border-foreground transition-colors cursor-pointer"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          strokeWidth={1.5}
        />
      </div>
    </div>
  )
}

interface AddressFormProps {
  isLoggedIn?: boolean
  onSubmit: (values: AddressFormValues) => void
}

export function AddressForm({ isLoggedIn = true, onSubmit }: AddressFormProps) {
  const [useSavedAddress, setUseSavedAddress] = useState(false)
  const [values, setValues] = useState<AddressFormValues>(EMPTY_ADDRESS)

  const handleToggleSaved = () => {
    const next = !useSavedAddress
    setUseSavedAddress(next)
    setValues(next ? SAVED_ADDRESS : EMPTY_ADDRESS)
  }

  const set = (field: keyof AddressFormValues) => (value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Heading row */}
      <div className="flex items-start justify-between mb-6">
        <h2 className="font-serif text-2xl text-foreground tracking-wide">
          Shipping Address
        </h2>

        {/* Saved address toggle — only shown when logged in */}
        {isLoggedIn && (
          <button
            type="button"
            onClick={handleToggleSaved}
            className={cn(
              "flex items-center gap-2 text-[12px] font-sans tracking-[0.1em] border px-3 py-2 transition-colors",
              useSavedAddress
                ? "bg-foreground text-primary-foreground border-foreground"
                : "bg-background text-foreground border-border hover:border-foreground"
            )}
          >
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
            {useSavedAddress ? "USING SAVED ADDRESS" : "USE SAVED ADDRESS"}
          </button>
        )}
      </div>

      {/* Saved address preview */}
      {useSavedAddress && (
        <div className="mb-6 p-4 border border-accent/40 bg-accent/5">
          <p className="text-[11px] font-sans tracking-[0.1em] text-accent mb-1 uppercase">
            Saved Address
          </p>
          <p className="text-sm font-sans text-foreground leading-relaxed">
            {SAVED_ADDRESS.firstName} {SAVED_ADDRESS.lastName},{" "}
            {SAVED_ADDRESS.addressLine1}
            {SAVED_ADDRESS.addressLine2 && `, ${SAVED_ADDRESS.addressLine2}`},{" "}
            {SAVED_ADDRESS.city}, {SAVED_ADDRESS.state} — {SAVED_ADDRESS.pincode}
          </p>
        </div>
      )}

      {/* Form grid */}
      <div
        className={cn(
          "grid gap-5 transition-opacity",
          useSavedAddress && "opacity-60 pointer-events-none"
        )}
      >
        {/* Row 1: First + Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="First Name"
            id="firstName"
            value={values.firstName}
            onChange={set("firstName")}
            placeholder="Arjun"
            required
          />
          <InputField
            label="Last Name"
            id="lastName"
            value={values.lastName}
            onChange={set("lastName")}
            placeholder="Mehta"
            required
          />
        </div>

        {/* Row 2: Email */}
        <InputField
          label="Email"
          id="email"
          type="email"
          value={values.email}
          onChange={set("email")}
          placeholder="arjun@email.com"
          required
        />

        {/* Row 3: Phone */}
        <InputField
          label="Phone"
          id="phone"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          placeholder="10-digit mobile number"
          maxLength={10}
          pattern="[0-9]{10}"
          required
        />

        {/* Row 4: Address Line 1 */}
        <InputField
          label="Address Line 1"
          id="addressLine1"
          value={values.addressLine1}
          onChange={set("addressLine1")}
          placeholder="House / Flat / Block No., Building Name, Street"
          required
        />

        {/* Row 5: Address Line 2 */}
        <InputField
          label="Address Line 2"
          id="addressLine2"
          value={values.addressLine2}
          onChange={set("addressLine2")}
          placeholder="Area, Colony, Landmark (optional)"
        />

        {/* Row 6: City + State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="City"
            id="city"
            value={values.city}
            onChange={set("city")}
            placeholder="Mumbai"
            required
          />
          <SelectField
            label="State"
            id="state"
            value={values.state}
            onChange={set("state")}
            options={INDIA_STATES}
            placeholder="Select state"
            required
          />
        </div>

        {/* Row 7: Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="Pincode"
            id="pincode"
            value={values.pincode}
            onChange={set("pincode")}
            placeholder="400 001"
            maxLength={6}
            pattern="[0-9]{6}"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-8 w-full h-12 bg-foreground text-primary-foreground font-sans text-[13px] tracking-[0.18em] hover:bg-foreground/90 transition-colors"
      >
        CONTINUE TO PAYMENT
      </button>
    </form>
  )
}
