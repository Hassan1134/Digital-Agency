param(
  [Parameter(Mandatory = $true)]
  [string]$PayloadBase64
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$workbookPath = Join-Path $projectRoot 'templates\Vergeform Enquiries.xlsx'
$payloadJson = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($PayloadBase64))
$payload = $payloadJson | ConvertFrom-Json

if (-not (Test-Path -LiteralPath $workbookPath)) {
  throw "The enquiry workbook was not found at $workbookPath"
}

$excelApp = $null
$workbook = $null
$worksheet = $null
$table = $null
$row = $null
$ownsExcel = $false
$openedWorkbook = $false

try {
  try {
    $excelApp = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
    foreach ($openWorkbook in $excelApp.Workbooks) {
      if ([string]::Equals($openWorkbook.FullName, $workbookPath, [StringComparison]::OrdinalIgnoreCase)) {
        $workbook = $openWorkbook
        break
      }
      [void][Runtime.InteropServices.Marshal]::ReleaseComObject($openWorkbook)
    }
  }
  catch {
    $excelApp = $null
  }

  if (-not $excelApp) {
    $excelApp = New-Object -ComObject Excel.Application
    $excelApp.Visible = $false
    $excelApp.DisplayAlerts = $false
    $ownsExcel = $true
  }
  if (-not $workbook) {
    $workbook = $excelApp.Workbooks.Open($workbookPath)
    $openedWorkbook = $true
  }
  if ($workbook.ReadOnly) { throw 'The workbook is open in Excel. Close it before submitting the form.' }
  $worksheet = $workbook.Worksheets.Item('Enquiries')
  $table = $worksheet.ListObjects.Item('Enquiries')

  if ($table.ListRows.Count -eq 1 -and $excelApp.WorksheetFunction.CountA($table.ListRows.Item(1).Range) -eq 0) {
    $row = $table.ListRows.Item(1)
  }
  else {
    $row = $table.ListRows.Add()
  }

  for ($columnIndex = 1; $columnIndex -le $table.ListColumns.Count; $columnIndex++) {
    $headerName = [string]$table.HeaderRowRange.Cells.Item(1, $columnIndex).Value2
    $property = $payload.PSObject.Properties[$headerName]
    $cellValue = if ($null -eq $property) { '' } else { [string]$property.Value }
    $targetCell = $row.Range.Cells.Item(1, $columnIndex)
    $targetCell.Value2 = $cellValue
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($targetCell)
  }

  $populatedCellCount = $excelApp.WorksheetFunction.CountA($row.Range)
  if ($populatedCellCount -lt 10) { throw "Excel populated only $populatedCellCount enquiry cells." }
  $workbook.Save()
}
finally {
  if ($workbook -and $openedWorkbook) { $workbook.Close($false) }
  if ($excelApp -and $ownsExcel) { $excelApp.Quit() }
  if ($row) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($row) }
  if ($table) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($table) }
  if ($worksheet) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($worksheet) }
  if ($workbook) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) }
  if ($excelApp) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($excelApp) }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}

Write-Output 'Enquiry saved to Vergeform Enquiries.xlsx'
