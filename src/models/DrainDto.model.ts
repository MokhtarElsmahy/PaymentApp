import { DrainLevelDto } from "./DrainLevelDto.model"

export class DrainDto {
    OdmId: number
    Odmid1: string
    OdmIdParent: string
    Rank: number
    AOdmName: string
    EOdmName: string
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
    OdmDesc: string
    PollutionDegree: number
    Realdrain: number
    PeriorityChange: number
    SideBankWidth: string
    DrainageStatus: string
    DrainType: number
    RowStatus :number

    DrainLevels: DrainLevelDto[]

}

