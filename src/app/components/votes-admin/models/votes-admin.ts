export interface Models {
}

export interface Enterprise {
    _id: string;
    address: string;
    city: string;
    code: string;
    contry: string;
    cuota: number;
    email: string;
    name: string;
    nif: string;
    section: string;
    status: boolean;
    total_votes: number;
    type_vote: string;
    vote_delegate: number;
    nifSelected?: any;
}

export interface Section {
    _id: string;
    enterprise_count: number;
    rounds: any;
    section: string;
    status: boolean;
    total_votes_section_default: number;
    vocales_total_default: number;
    vote_delegate: number;
    vote_present: number;
    roundActual?: number | null;
}

export interface EnterpriseAsist {
    nif: string;
    status: boolean;
}

export interface EnterpriseDelegate {
    nif: string;
    nif_delegate: string;
}