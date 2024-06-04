export interface VotesMixta {
}

export interface Sections {
    _id: string;
    enterprise_count: number
    rounds: [],
    section: string;
    status: boolean;
    total_votes_section_default: number;
    vocales_total_default: number;
    vote_delegate: number;
    vote_present: number;
    quantityVotes?: string | number;
    porcentageDirect?: string | number;
}

export interface Rule {
    _id: string;
    round: number;
    rule: number;
    section: string;
    total_vocales: number;
    total_votes_rule: number;
    total_votes_section_default: number;
}