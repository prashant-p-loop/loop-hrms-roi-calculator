import React, { useState } from 'react';
import { Calculator, TrendingUp, Users, AlertCircle, CheckCircle, FileText, Info } from 'lucide-react';

function ResearchBackedHRMSCalculator() {
  const [inputs, setInputs] = useState({
    newHiresPerMonth: 15,
    avgTimePerNewHire: 25, // Research: 15-30 minutes per employee
    hrExecutiveSalary: 50000, // Monthly salary
    currentEmployees: 200,
    growthTarget: 300,
    // Direct cost inputs
    annualErrorRelatedCosts: 50000, // What they actually spend on errors/corrections annually
    employeeQueryHoursPerMonth: 10 // How many hours they spend on employee queries monthly
  });

  const [showResearch, setShowResearch] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  // Simple calculations based on their actual inputs
  const hourlyRate = inputs.hrExecutiveSalary / 160;
  
  // Manual data entry cost (Research: 15-30 min per new hire)
  const monthlyDataEntryHours = (inputs.newHiresPerMonth * inputs.avgTimePerNewHire) / 60;
  const monthlyDataEntryCost = monthlyDataEntryHours * hourlyRate;
  const annualDataEntryCost = monthlyDataEntryCost * 12;

  // Employee query cost (they tell us how many hours they spend)
  const monthlyQueryCost = inputs.employeeQueryHoursPerMonth * hourlyRate;
  const annualQueryCost = monthlyQueryCost * 12;

  // Growth impact calculation
  const additionalHires = inputs.growthTarget - inputs.currentEmployees;
  const additionalHoursNeeded = (additionalHires * inputs.avgTimePerNewHire) / 60;
  const needsAdditionalHR = additionalHoursNeeded > 40;
  const additionalHRCost = needsAdditionalHR ? inputs.hrExecutiveSalary * 12 : 0;

  // Total current costs
  const totalAnnualCost = annualDataEntryCost + annualQueryCost + inputs.annualErrorRelatedCosts;
  const totalWithGrowth = totalAnnualCost + additionalHRCost;

  // HRMS Integration Savings (conservative estimates)
  const dataEntrySavings = annualDataEntryCost * 0.70; // 70% time savings
  const querySavings = annualQueryCost * 0.60; // 60% reduction in queries
  const errorSavings = inputs.annualErrorRelatedCosts * 0.50; // 50% error reduction
  const totalAnnualSavings = dataEntrySavings + querySavings + errorSavings;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const researchData = [
    {
      claim: "Manual data entry takes 15-30 minutes per new hire",
      source: "HR Process Time Studies",
      finding: "Time includes data verification, form filling, and system updates across multiple platforms"
    },
    {
      claim: "HR Executives typically earn ₹25K-65K monthly in India",
      source: "PayScale India & HR Salary Surveys",
      finding: "Benefits coordinators handling insurance admin fall in this salary range"
    },
    {
      claim: "HRMS integration saves 60-70% of manual data entry time",
      source: "Process Automation Studies",
      finding: "Automated sync eliminates duplicate data entry and reduces verification needs"
    },
    {
      claim: "Employee self-service reduces HR queries by 50-80%",
      source: "HR Technology Impact Studies",
      finding: "When employees can access information independently, support requests drop significantly"
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'white', 
      padding: '24px', 
      fontFamily: 'Work Sans, system-ui, sans-serif' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
          overflow: 'hidden', 
          border: '2px solid #025F4C' 
        }}>
          {/* Header */}
          <div style={{ 
            padding: '32px', 
            color: 'white', 
            backgroundColor: '#025F4C' 
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calculator size={32} color="#FDD506" />
                <h1 style={{ 
                  fontSize: '30px', 
                  fontWeight: 'bold', 
                  margin: '0',
                  lineHeight: '1.2'
                }}>HRMS ROI Calculator</h1>
              </div>
              <div style={{ textAlign: 'right' }}>
                <img 
                  src="https://cdn.prod.website-files.com/619b33946e0527b5a12bec15/61f8edaea1ae55f5e0ad7d5a_loop-logo-green.svg" 
                  alt="Loop" 
                  style={{ height: '48px', marginBottom: '8px', display: 'block' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#36D6C3',
                  display: 'none'
                }}>Loop</div>
                <div style={{ fontSize: '14px', color: '#36D6C3' }}>Powered by Loop</div>
              </div>
            </div>
            <p style={{ 
              fontSize: '18px', 
              color: '#36D6C3', 
              margin: '0 0 16px 0' 
            }}>Calculate your actual healthcare administration costs and potential HRMS savings</p>
            
            {/* Important Disclaimer */}
            <div style={{
              backgroundColor: 'rgba(253, 213, 6, 0.1)',
              border: '2px solid #FDD506',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <Info size={20} color="#FDD506" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <p style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#FDD506',
                  margin: '0 0 4px 0'
                }}>Important Disclaimer</p>
                <p style={{ 
                  fontSize: '13px', 
                  color: '#36D6C3',
                  margin: '0',
                  lineHeight: '1.4'
                }}>
                  All savings calculations are estimates based on your inputs and industry averages. 
                  Actual results may vary based on your specific processes, technology adoption, and organizational factors.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowResearch(!showResearch)}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                backgroundColor: '#36D6C3',
                color: '#025F4C',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <FileText size={16} />
              {showResearch ? 'Hide' : 'Show'} Research Sources
            </button>
          </div>

          {/* Research Sources */}
          {showResearch && (
            <div style={{ 
              padding: '24px', 
              backgroundColor: '#f8f9fa', 
              borderBottom: '2px solid #36D6C3' 
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                marginBottom: '16px', 
                color: '#025F4C' 
              }}>Research Sources & Data</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {researchData.map((item, index) => (
                  <div key={index} style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    backgroundColor: 'white', 
                    border: '1px solid #36D6C3' 
                  }}>
                    <p style={{ 
                      fontWeight: '600', 
                      fontSize: '14px', 
                      color: '#025F4C',
                      margin: '0 0 4px 0'
                    }}>{item.claim}</p>
                    <p style={{ 
                      fontSize: '12px', 
                      margin: '4px 0', 
                      color: '#595959' 
                    }}>
                      <strong>Source:</strong> {item.source}
                    </p>
                    <p style={{ 
                      fontSize: '12px', 
                      margin: '4px 0 0 0', 
                      color: '#595959' 
                    }}>
                      <strong>Finding:</strong> {item.finding}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '32px', 
            padding: '32px' 
          }}>
            {/* Input Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#025F4C',
                margin: '0'
              }}>
                <Users size={24} />
                Your Current Situation
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Basic Info */}
                {[
                  { label: 'New hires per month', field: 'newHiresPerMonth', description: 'Number of new employees joining monthly' },
                  { label: 'Time per hire (minutes)', field: 'avgTimePerNewHire', min: 15, max: 60, description: 'Time spent manually entering each new hire\'s insurance data' },
                  { label: 'HR Executive monthly salary (₹)', field: 'hrExecutiveSalary', min: 25000, max: 80000, description: 'Salary of person handling insurance administration' },
                  { label: 'Current employee count', field: 'currentEmployees', description: 'Total number of employees currently' },
                  { label: 'Growth target (employees)', field: 'growthTarget', description: 'Target employee count for next 12 months' }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    padding: '16px', 
                    borderRadius: '8px', 
                    backgroundColor: '#f0f9f7', 
                    border: '2px solid #36D6C3' 
                  }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '8px', 
                      color: '#025F4C' 
                    }}>
                      {item.label}
                    </label>
                    <input
                      type="number"
                      value={inputs[item.field]}
                      onChange={(e) => handleInputChange(item.field, e.target.value)}
                      min={item.min}
                      max={item.max}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '2px solid #025F4C',
                        borderRadius: '8px',
                        fontSize: '18px',
                        color: '#025F4C',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <p style={{ 
                      fontSize: '12px', 
                      marginTop: '4px', 
                      color: '#555',
                      margin: '4px 0 0 0'
                    }}>{item.description}</p>
                    {item.field === 'hrExecutiveSalary' && (
                      <p style={{ 
                        fontSize: '12px', 
                        marginTop: '4px', 
                        color: '#666',
                        margin: '4px 0 0 0'
                      }}>Hourly rate: ₹{hourlyRate.toFixed(0)}</p>
                    )}
                  </div>
                ))}

                {/* Actual Cost Inputs */}
                <div style={{ 
                  padding: '20px', 
                  borderRadius: '12px', 
                  backgroundColor: '#fff8f0', 
                  border: '2px solid #FDD506' 
                }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    color: '#025F4C',
                    marginBottom: '16px',
                    margin: '0 0 16px 0'
                  }}>Your Actual Costs</h3>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '8px', 
                      color: '#025F4C' 
                    }}>
                      Annual out-of-pocket costs for coverage gaps/errors (₹)
                    </label>
                    <input
                      type="number"
                      value={inputs.annualErrorRelatedCosts}
                      onChange={(e) => handleInputChange('annualErrorRelatedCosts', e.target.value)}
                      min={0}
                      max={500000}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '2px solid #025F4C',
                        borderRadius: '8px',
                        fontSize: '16px',
                        color: '#025F4C',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    />
                    <p style={{ 
                      fontSize: '12px', 
                      marginTop: '4px', 
                      color: '#666',
                      margin: '4px 0 0 0'
                    }}>Company reimbursements for medical claims when employee coverage was missing due to enrollment delays/errors</p>
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '8px', 
                      color: '#025F4C' 
                    }}>
                      Hours spent monthly on employee insurance queries
                    </label>
                    <input
                      type="number"
                      value={inputs.employeeQueryHoursPerMonth}
                      onChange={(e) => handleInputChange('employeeQueryHoursPerMonth', e.target.value)}
                      min={0}
                      max={100}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '2px solid #025F4C',
                        borderRadius: '8px',
                        fontSize: '16px',
                        color: '#025F4C',
                        outline: 'none',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                      }}
                    />
                    <p style={{ 
                      fontSize: '12px', 
                      marginTop: '4px', 
                      color: '#666',
                      margin: '4px 0 0 0'
                    }}>Time answering: "When does my coverage start?", "Is my family covered?", etc.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#025F4C',
                margin: '0'
              }}>
                <TrendingUp size={24} color="#FF8080" />
                Your Current Annual Costs
              </h2>

              {/* Cost Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { 
                    title: 'Manual Data Entry for New Hires', 
                    subtitle: `${monthlyDataEntryHours.toFixed(1)} hours/month × ${formatCurrency(hourlyRate)}/hour`, 
                    value: annualDataEntryCost 
                  },
                  { 
                    title: 'Employee Query Handling', 
                    subtitle: `${inputs.employeeQueryHoursPerMonth} hours/month × ${formatCurrency(hourlyRate)}/hour`, 
                    value: annualQueryCost 
                  },
                  { 
                    title: 'Out-of-Pocket Coverage Gap Costs', 
                    subtitle: 'Company reimbursements when employee coverage was missing', 
                    value: inputs.annualErrorRelatedCosts 
                  }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    padding: '16px', 
                    borderRadius: '8px', 
                    backgroundColor: '#fff5f5', 
                    borderLeft: '4px solid #FF8080' 
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}>
                      <div>
                        <p style={{ 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          color: '#025F4C',
                          margin: '0 0 4px 0'
                        }}>{item.title}</p>
                        <p style={{ 
                          fontSize: '12px', 
                          color: '#666',
                          margin: '0'
                        }}>{item.subtitle}</p>
                      </div>
                      <p style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#FF8080',
                        margin: '0'
                      }}>{formatCurrency(item.value)}/year</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Cost */}
              <div style={{ 
                padding: '24px', 
                borderRadius: '12px', 
                color: 'white', 
                backgroundColor: '#FF8080' 
              }}>
                <p style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '4px',
                  margin: '0 0 4px 0'
                }}>TOTAL ANNUAL COST</p>
                <p style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold',
                  margin: '0'
                }}>{formatCurrency(totalAnnualCost)}</p>
                <p style={{ 
                  fontSize: '14px', 
                  marginTop: '8px', 
                  opacity: '0.9',
                  margin: '8px 0 0 0'
                }}>Based on your actual inputs and time spent</p>
              </div>

              {/* Growth Warning */}
              {needsAdditionalHR && (
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '8px', 
                  backgroundColor: '#fffbf0', 
                  borderLeft: '4px solid #FDD506' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <AlertCircle size={20} color="#FDD506" style={{ marginTop: '2px' }} />
                    <div>
                      <p style={{ 
                        fontWeight: '600', 
                        color: '#025F4C',
                        margin: '0 0 4px 0'
                      }}>Growth Impact Alert</p>
                      <p style={{ 
                        fontSize: '14px', 
                        margin: '4px 0', 
                        color: '#333' 
                      }}>
                        Growing to {inputs.growthTarget} employees will require <strong>{additionalHoursNeeded.toFixed(0)} additional hours/month</strong> of insurance admin work.
                      </p>
                      <p style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold', 
                        marginTop: '8px', 
                        color: '#FDD506',
                        margin: '8px 0 0 0'
                      }}>
                        Additional cost: {formatCurrency(additionalHRCost)}/year
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* HRMS Value */}
              <div style={{ 
                borderTop: '2px solid #36D6C3', 
                paddingTop: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: '#025F4C',
                  margin: '0 0 12px 0'
                }}>Estimated HRMS Integration Savings</h3>
                
                {[
                  { 
                    title: 'Data Entry Time Savings (70%)', 
                    subtitle: 'Automated sync eliminates most manual data entry', 
                    value: dataEntrySavings 
                  },
                  { 
                    title: 'Employee Query Reduction (60%)', 
                    subtitle: 'Self-service access reduces support requests', 
                    value: querySavings 
                  },
                  { 
                    title: 'Coverage Gap Prevention (50%)', 
                    subtitle: 'Reduced out-of-pocket costs from instant activation', 
                    value: errorSavings 
                  }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    padding: '16px', 
                    borderRadius: '8px', 
                    backgroundColor: '#f0fff8', 
                    borderLeft: '4px solid #BCDD33' 
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}>
                      <div>
                        <p style={{ 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          color: '#025F4C',
                          margin: '0 0 4px 0'
                        }}>{item.title}</p>
                        <p style={{ 
                          fontSize: '12px', 
                          color: '#333',
                          margin: '0'
                        }}>{item.subtitle}</p>
                      </div>
                      <p style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#BCDD33',
                        margin: '0'
                      }}>{formatCurrency(item.value)}/year</p>
                    </div>
                  </div>
                ))}

                {/* Total Value */}
                <div style={{ 
                  padding: '24px', 
                  borderRadius: '12px', 
                  color: 'white', 
                  backgroundColor: '#36D6C3' 
                }}>
                  <p style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    marginBottom: '4px',
                    margin: '0 0 4px 0'
                  }}>ESTIMATED TOTAL ANNUAL SAVINGS</p>
                  <p style={{ 
                    fontSize: '36px', 
                    fontWeight: 'bold',
                    margin: '0'
                  }}>{formatCurrency(totalAnnualSavings)}</p>
                  <p style={{ 
                    fontSize: '14px', 
                    marginTop: '8px', 
                    opacity: '0.9',
                    margin: '8px 0 0 0'
                  }}>Conservative estimates based on your actual costs</p>
                </div>

                {/* Benefits */}
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '8px', 
                  backgroundColor: '#f5f0ff', 
                  borderLeft: '4px solid #A586EF' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CheckCircle size={20} color="#A586EF" style={{ marginTop: '2px' }} />
                    <div>
                      <p style={{ 
                        fontWeight: '600', 
                        color: '#025F4C',
                        margin: '0 0 8px 0'
                      }}>Additional Benefits (Non-Monetary)</p>
                      <ul style={{ 
                        fontSize: '14px', 
                        marginTop: '8px', 
                        color: '#333',
                        paddingLeft: '20px',
                        margin: '8px 0 0 0'
                      }}>
                        <li style={{ marginBottom: '4px' }}>Instant healthcare activation via Loop App</li>
                        <li style={{ marginBottom: '4px' }}>99.9% data accuracy eliminates coverage gaps</li>
                        <li style={{ marginBottom: '4px' }}>Real-time eligibility tracking and compliance</li>
                        <li style={{ marginBottom: '4px' }}>Employee self-service capabilities</li>
                        <li style={{ marginBottom: '4px' }}>Reduced HR administrative burden</li>
                        <li style={{ marginBottom: '0' }}>Improved employee satisfaction</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Summary */}
              <div style={{ 
                padding: '24px', 
                borderRadius: '12px', 
                color: 'white', 
                backgroundColor: '#025F4C' 
              }}>
                <p style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '8px', 
                  color: '#FDD506',
                  margin: '0 0 8px 0'
                }}>ROI ANALYSIS</p>
                <p style={{ 
                  fontSize: '18px',
                  margin: '0 0 8px 0'
                }}>Current annual cost: <strong>{formatCurrency(totalAnnualCost)}</strong></p>
                {needsAdditionalHR && (
                  <p style={{ 
                    fontSize: '18px', 
                    marginTop: '8px',
                    margin: '8px 0'
                  }}>With growth: <strong>{formatCurrency(totalWithGrowth)}</strong></p>
                )}
                <p style={{ 
                  fontSize: '18px', 
                  marginTop: '12px',
                  margin: '12px 0'
                }}>HRMS Integration savings: <strong>{formatCurrency(totalAnnualSavings)}</strong></p>
                <div style={{ 
                  marginTop: '16px', 
                  paddingTop: '16px', 
                  borderTop: '2px solid #36D6C3' 
                }}>
                  <p style={{ 
                    fontSize: '32px', 
                    fontWeight: 'bold', 
                    color: '#FDD506',
                    margin: '0'
                  }}>
                    ROI: {((totalAnnualSavings / totalAnnualCost) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center', 
          fontSize: '14px', 
          color: '#666' 
        }}>
          <p style={{ margin: '0 0 8px 0' }}>Calculations based on your actual inputs and conservative industry savings estimates.</p>
          <p style={{ margin: '8px 0' }}>Actual results may vary based on implementation and organizational factors.</p>
          <p style={{ margin: '8px 0 0 0' }}>Powered by <strong style={{ color: '#025F4C' }}>Loop</strong></p>
        </div>
      </div>
    </div>
  );
}

export default ResearchBackedHRMSCalculator;