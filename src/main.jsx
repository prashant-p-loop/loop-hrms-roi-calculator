import React, { useState } from 'react';
import { Calculator, TrendingUp, Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function HRMSROICalculator() {
  const [inputs, setInputs] = useState({
    newHiresPerMonth: 15,
    timePerHire: 30,
    hrExecutiveSalary: 35000,
    dataErrorsPerYear: 3,
    costPerError: 45000,
    queriesPerMonth: 12,
    timePerQuery: 15,
    currentEmployees: 200,
    growthTarget: 300,
    replacementCost: 300000
  });

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  // Calculations
  const hourlyRate = inputs.hrExecutiveSalary / 160;
  
  // Manual data entry cost
  const monthlyDataEntryHours = (inputs.newHiresPerMonth * inputs.timePerHire) / 60;
  const monthlyDataEntryCost = monthlyDataEntryHours * hourlyRate;
  const annualDataEntryCost = monthlyDataEntryCost * 12;

  // Error costs
  const annualErrorCost = inputs.dataErrorsPerYear * inputs.costPerError;
  const errorCleanupHours = inputs.dataErrorsPerYear * 6;
  const errorCleanupCost = errorCleanupHours * hourlyRate;
  const totalErrorCost = annualErrorCost + errorCleanupCost;

  // Query handling cost
  const monthlyQueryHours = (inputs.queriesPerMonth * inputs.timePerQuery) / 60;
  const monthlyQueryCost = monthlyQueryHours * hourlyRate;
  const annualQueryCost = monthlyQueryCost * 12;

  // Growth impact
  const additionalHires = inputs.growthTarget - inputs.currentEmployees;
  const additionalHoursNeeded = (additionalHires * inputs.timePerHire) / 60;
  const needsAdditionalHR = additionalHoursNeeded > 40;
  const additionalHRCost = needsAdditionalHR ? inputs.hrExecutiveSalary * 12 : 0;

  // Attrition risk
  const attritionRiskCost = inputs.replacementCost * 0.1;

  // Total annual cost
  const totalAnnualCost = 
    annualDataEntryCost + 
    totalErrorCost + 
    annualQueryCost + 
    attritionRiskCost;

  const totalWithGrowth = totalAnnualCost + additionalHRCost;

  // HRMS Integration Value
  const timeSavingsPercent = 65;
  const annualTimeSavings = (annualDataEntryCost + annualQueryCost) * (timeSavingsPercent / 100);
  const errorReduction = totalErrorCost * 0.95;
  const totalAnnualValue = annualTimeSavings + errorReduction;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-white p-6" style={{ fontFamily: 'Work Sans, system-ui, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2" style={{ borderColor: '#025F4C' }}>
          {/* Header with Loop Branding */}
          <div className="p-8 text-white" style={{ backgroundColor: '#025F4C' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8" style={{ color: '#FDD506' }} />
                <h1 className="text-3xl font-bold">HRMS Integration ROI Calculator</h1>
              </div>
              <div className="text-right">
                <img 
                  src="https://cdn.prod.website-files.com/619b33946e0527b5a12bec15/61f8edaecca71a1ae15ec68b_loop-logo-moss.svg" 
                  alt="Loop" 
                  className="h-12 mb-2"
                />
                <div className="text-sm" style={{ color: '#36D6C3' }}>Powered by Loop</div>
              </div>
            </div>
            <p className="text-lg" style={{ color: '#36D6C3' }}>Calculate the real cost of manual insurance administration</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#025F4C' }}>
                <Users className="w-6 h-6" />
                Your Current Situation
              </h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f7', border: '2px solid #36D6C3' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#025F4C' }}>
                    New hires per month
                  </label>
                  <input
                    type="number"
                    value={inputs.newHiresPerMonth}
                    onChange={(e) => handleInputChange('newHiresPerMonth', e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-lg"
                    style={{ borderColor: '#36D6C3', color: '#025F4C' }}
                  />
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f7', border: '2px solid #36D6C3' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#025F4C' }}>
                    Time per hire (minutes)
                  </label>
                  <input
                    type="number"
                    value={inputs.timePerHire}
                    onChange={(e) => handleInputChange('timePerHire', e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-lg"
                    style={{ borderColor: '#36D6C3', color: '#025F4C' }}
                  />
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f7', border: '2px solid #36D6C3' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#025F4C' }}>
                    HR Executive monthly salary (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.hrExecutiveSalary}
                    onChange={(e) => handleInputChange('hrExecutiveSalary', e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-lg"
                    style={{ borderColor: '#36D6C3', color: '#025F4C' }}
                  />
                  <p className="text-xs mt-1" style={{ color: '#595959' }}>Hourly rate: ₹{hourlyRate.toFixed(0)}</p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f7', border: '2px solid #36D6C3' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#025F4C' }}>
                    Data errors per year
                  </label>
                  <input
                    type="number"
                    value={inputs.dataErrorsPerYear}
                    onChange={(e) => handleInputChange('dataErrorsPerYear', e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-lg"
                    style={{ borderColor: '#36D6C3', color: '#025F4C' }}
                  />
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f7', border: '2px solid #36D6C3' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#025F4C' }}>
                    Average cost per error (₹)
                  </label>
                  <input
                    type="number"
                    value={inputs.costPerError}
                    onChange={(e) => handleInputChange('costPerError', e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-lg"
                    style={{ borderColor: '#36D6C3', color: '#025F4C' }}
                  />
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f7', border: '2px solid #36D6C3' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#025F4C' }}>
                    Employee queries per month
                  </label>
                  <input
                    type="number"
                    value={inputs.queriesPerMonth}
                    onChange={(e) => handleInputChange('queriesPerMonth', e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-lg"
                    style={{ borderColor: '#36D6C3', color: '#025F4C' }}
                  />
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f7', border: '2px solid #36D6C3' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#025F4C' }}>
                    Current employee count
                  </label>
                  <input
                    type="number"
                    value={inputs.currentEmployees}
                    onChange={(e) => handleInputChange('currentEmployees', e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-lg"
                    style={{ borderColor: '#36D6C3', color: '#025F4C' }}
                  />
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#f0f9f7', border: '2px solid #36D6C3' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#025F4C' }}>
                    Growth target (employees)
                  </label>
                  <input
                    type="number"
                    value={inputs.growthTarget}
                    onChange={(e) => handleInputChange('growthTarget', e.target.value)}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-lg"
                    style={{ borderColor: '#36D6C3', color: '#025F4C' }}
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#025F4C' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#FF8080' }} />
                Your Hidden Costs
              </h2>

              {/* Cost Breakdown */}
              <div className="space-y-3">
                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#fff5f5', borderColor: '#FF8080' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#025F4C' }}>Manual Data Entry</p>
                      <p className="text-xs" style={{ color: '#595959' }}>{monthlyDataEntryHours.toFixed(1)} hours/month</p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: '#FF8080' }}>{formatCurrency(annualDataEntryCost)}/year</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#fff5f5', borderColor: '#FF8080' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#025F4C' }}>Data Errors & Cleanup</p>
                      <p className="text-xs" style={{ color: '#595959' }}>{inputs.dataErrorsPerYear} errors/year</p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: '#FF8080' }}>{formatCurrency(totalErrorCost)}/year</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#fff5f5', borderColor: '#FF8080' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#025F4C' }}>Employee Query Handling</p>
                      <p className="text-xs" style={{ color: '#595959' }}>{monthlyQueryHours.toFixed(1)} hours/month</p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: '#FF8080' }}>{formatCurrency(annualQueryCost)}/year</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#fff5f5', borderColor: '#FF8080' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#025F4C' }}>Attrition Risk</p>
                      <p className="text-xs" style={{ color: '#595959' }}>10% attribution to benefits issues</p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: '#FF8080' }}>{formatCurrency(attritionRiskCost)}/year</p>
                  </div>
                </div>
              </div>

              {/* Total Current Cost */}
              <div className="p-6 rounded-xl text-white" style={{ backgroundColor: '#FF8080' }}>
                <p className="text-sm font-semibold mb-1">TOTAL ANNUAL COST</p>
                <p className="text-4xl font-bold">{formatCurrency(totalAnnualCost)}</p>
                <p className="text-sm mt-2 opacity-90">What you're paying for manual processes</p>
              </div>

              {/* Growth Impact Warning */}
              {needsAdditionalHR && (
                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#fffbf0', borderColor: '#FDD506' }}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: '#FDD506' }} />
                    <div>
                      <p className="font-semibold" style={{ color: '#025F4C' }}>Growth Impact Alert</p>
                      <p className="text-sm mt-1" style={{ color: '#595959' }}>
                        Growing to {inputs.growthTarget} employees will require <strong>{additionalHoursNeeded.toFixed(0)} additional hours/month</strong> of insurance admin work.
                      </p>
                      <p className="text-sm mt-2" style={{ color: '#595959' }}>
                        <strong>You'll likely need to hire another HR Executive</strong>
                      </p>
                      <p className="text-lg font-bold mt-2" style={{ color: '#FDD506' }}>
                        Additional cost: {formatCurrency(additionalHRCost)}/year
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* HRMS Integration Value */}
              <div className="border-t-2 pt-6 space-y-3" style={{ borderColor: '#36D6C3' }}>
                <h3 className="text-xl font-bold" style={{ color: '#025F4C' }}>With HRMS Integration</h3>
                
                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f0fff8', borderColor: '#BCDD33' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#025F4C' }}>Time Savings (65%)</p>
                      <p className="text-xs" style={{ color: '#595959' }}>Automated data sync</p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: '#BCDD33' }}>{formatCurrency(annualTimeSavings)}/year</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f0fff8', borderColor: '#BCDD33' }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#025F4C' }}>Error Elimination (95%)</p>
                      <p className="text-xs" style={{ color: '#595959' }}>99%+ data accuracy</p>
                    </div>
                    <p className="text-xl font-bold" style={{ color: '#BCDD33' }}>{formatCurrency(errorReduction)}/year</p>
                  </div>
                </div>

                <div className="p-6 rounded-xl text-white" style={{ backgroundColor: '#36D6C3' }}>
                  <p className="text-sm font-semibold mb-1">TOTAL ANNUAL VALUE</p>
                  <p className="text-4xl font-bold">{formatCurrency(totalAnnualValue)}</p>
                  <p className="text-sm mt-2 opacity-90">Quantified savings from HRMS integration</p>
                </div>

                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: '#f5f0ff', borderColor: '#A586EF' }}>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 mt-0.5" style={{ color: '#A586EF' }} />
                    <div>
                      <p className="font-semibold" style={{ color: '#025F4C' }}>Additional Benefits</p>
                      <ul className="text-sm mt-2 space-y-1" style={{ color: '#595959' }}>
                        <li>• Day-1 healthcare access for employees & families</li>
                        <li>• HR Dashboard for real-time visibility</li>
                        <li>• Instant e-cards and claims via Loop App</li>
                        <li>• Scale to {inputs.growthTarget} without additional HR staff</li>
                        <li>• HR team focuses on strategic initiatives</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Summary */}
              <div className="p-6 rounded-xl text-white" style={{ backgroundColor: '#025F4C' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: '#FDD506' }}>THE BOTTOM LINE</p>
                <p className="text-lg">You're currently spending <strong>{formatCurrency(totalAnnualCost)}/year</strong> on manual insurance processes.</p>
                {needsAdditionalHR && (
                  <p className="text-lg mt-2">With planned growth, this becomes <strong>{formatCurrency(totalWithGrowth)}/year</strong></p>
                )}
                <p className="text-lg mt-3">HRMS Integration delivers <strong>{formatCurrency(totalAnnualValue)}/year</strong> in quantified value.</p>
                <div className="mt-4 pt-4" style={{ borderTop: '2px solid #36D6C3' }}>
                  <p className="text-2xl font-bold" style={{ color: '#FDD506' }}>
                    ROI: {((totalAnnualValue / totalAnnualCost) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm" style={{ color: '#595959' }}>
          <p>All calculations based on client-provided data. Conservative estimates used throughout.</p>
          <p className="mt-2">Powered by <strong style={{ color: '#025F4C' }}>Loop</strong></p>
        </div>
      </div>
    </div>
  );
}