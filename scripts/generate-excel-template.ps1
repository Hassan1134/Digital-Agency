$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$templateDirectory = Join-Path $projectRoot 'templates'
$workbookPath = Join-Path $templateDirectory 'Vergeform Enquiries.xlsx'
$headers = @(
  'Submission ID',
  'Submitted At (UTC)',
  'Name',
  'Email',
  'Company',
  'Phone',
  'Website',
  'Services',
  'Goal',
  'Budget',
  'Timeline',
  'Project Description',
  'Source URL',
  'Status'
)

New-Item -ItemType Directory -Path $templateDirectory -Force | Out-Null

$excelApp = $null
$workbook = $null
$enquiriesSheet = $null

try {
  $excelApp = New-Object -ComObject Excel.Application
  $excelApp.Visible = $false
  $excelApp.DisplayAlerts = $false
  $workbook = $excelApp.Workbooks.Add()

  $enquiriesSheet = $workbook.Worksheets.Item(1)
  $enquiriesSheet.Name = 'Enquiries'

  for ($columnIndex = 0; $columnIndex -lt $headers.Count; $columnIndex++) {
    $enquiriesSheet.Cells.Item(1, $columnIndex + 1) = $headers[$columnIndex]
  }

  $tableRange = $enquiriesSheet.Range('A1:N2')
  $enquiriesTable = $enquiriesSheet.ListObjects.Add(1, $tableRange, $null, 1)
  $enquiriesTable.Name = 'Enquiries'
  $enquiriesTable.TableStyle = 'TableStyleMedium4'
  $enquiriesTable.ListRows.Item(1).Delete()

  $headerRange = $enquiriesSheet.Range('A1:N1')
  $headerRange.Font.Name = 'Aptos Display'
  $headerRange.Font.Bold = $true
  $headerRange.Font.Color = 0x111111
  $headerRange.Interior.Color = 0x3FFFD7
  $headerRange.RowHeight = 28

  $enquiriesSheet.Columns.Item('A').ColumnWidth = 38
  $enquiriesSheet.Columns.Item('B').ColumnWidth = 24
  $enquiriesSheet.Columns.Item('C').ColumnWidth = 22
  $enquiriesSheet.Columns.Item('D').ColumnWidth = 30
  $enquiriesSheet.Columns.Item('E').ColumnWidth = 24
  $enquiriesSheet.Columns.Item('F').ColumnWidth = 20
  $enquiriesSheet.Columns.Item('G').ColumnWidth = 30
  $enquiriesSheet.Columns.Item('H').ColumnWidth = 34
  $enquiriesSheet.Columns.Item('I').ColumnWidth = 20
  $enquiriesSheet.Columns.Item('J').ColumnWidth = 20
  $enquiriesSheet.Columns.Item('K').ColumnWidth = 23
  $enquiriesSheet.Columns.Item('L').ColumnWidth = 52
  $enquiriesSheet.Columns.Item('M').ColumnWidth = 38
  $enquiriesSheet.Columns.Item('N').ColumnWidth = 14
  $enquiriesSheet.Range('A:N').VerticalAlignment = -4160
  $enquiriesSheet.Range('L:L').WrapText = $true
  $enquiriesSheet.Activate()
  $excelApp.ActiveWindow.SplitRow = 1
  $excelApp.ActiveWindow.FreezePanes = $true

  $enquiriesSheet.Activate()
  $workbook.SaveAs($workbookPath, 51)
}
finally {
  if ($workbook) { $workbook.Close($false) }
  if ($excelApp) { $excelApp.Quit() }
  if ($enquiriesSheet) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($enquiriesSheet) }
  if ($workbook) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) }
  if ($excelApp) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($excelApp) }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}

Write-Output $workbookPath
