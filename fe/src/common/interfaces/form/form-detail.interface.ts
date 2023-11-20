export interface IDemographicInfo {
    uid: string;
    id: string; // ID number
    name: string;
    gender: string;
    address: string;
    phone: string;
}

export interface ISymptomInfo {
    id?: string | number; // unique id for frontend or has_symptom (if needed)
    symptomId: string | number;
    description: string;
    seriousness?: string;
}

export interface IComorbidityInfo {
    id?: string | number;
    comorbidityId: string | number;
    description: string;
    seriousness?: string;
}

export interface ITestInfo {
    id: string;
    type: "SPO2 Test" | "PCR Test" | "Quick Test" | "Respiratory Rate Test";
    spo2Rate?: number;
    result?: boolean;
    ctThreshold?: number;
    respiratoryBpm?: number;
}

export interface IMedicationEffect {
    medEffectId: string;
    medEffect: string;
}

export interface IMedicationInfo {
    medId: string;
    medName: string;
    exp: string;
    effects: IMedicationEffect[];
    price: string;
}
export interface ITreatmenInfo {
    treatmentId: string;
    startDate: string;
    endDate: string;
    medications: IMedicationInfo[];
    result: string;
}
export interface IDemographicFormProps {
}

export interface IMedicationFormProps {
    medications: IMedicationInfo[];
    treatmentIndex: number;
}

export interface IMedicationEffectsFormProps {
    medicationIndex: number;
    treatmentIndex: number;
    medicationEffects: IMedicationEffect[];
}