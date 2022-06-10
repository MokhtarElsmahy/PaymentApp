import { DrainLevelDto } from "./DrainLevelDto.model"

export class DrainDto {
    OdmId: number
    Odmid1: String
    OdmIdParent: String
    Rank: number
    AOdmName: String
    EOdmName: String
    Length: number
    Area: number
    Navigation: number
    Year: Date
    OutfallType: number
    Side: number
    CriticalLevel: number
    ActualLevel: number
    Location: number
    Longitude: number
    Latitude: number
    OdmDesc: String
    PollutionDegree: number
    Realdrain: number
    PeriorityChange: number
    SideBankWidth: String
    DrainageStatus: String
    DrainType: number

    DrainLevels: DrainLevelDto[]

}

