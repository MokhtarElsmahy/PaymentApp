export class DrainLevelDto {
    OdmId: number
    MeasureDate: Date
    DcdId: number
    DdgId: number
    SinkId: number
    UsualLevel: number
    ActualLevel: number
    Note: String
    isUpdated :boolean = false
    isAdded :boolean = false
    RowStatus :number
}