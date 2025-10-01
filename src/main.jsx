import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Calculator, TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react'

function HRMSROICalculator() {
  const [inputs, setInputs] = React.useState({
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

  const hourlyRate = inputs.hrExecutiveSalary / 160;
  const monthlyDataEntryHours = (inputs.newHiresPerMonth * inputs.timePerHire) / 60;
  const monthlyDataEntryCost = monthlyDataEntryHours * hourlyRate;
  const annualDataEntryCost = monthlyDataEntryCost * 12;
  const annualErrorCost = inputs.dataErrorsPerYear * inputs.costPerError;
  const errorCleanupHours = inputs.dataErrorsPerYear * 6;
  const errorCleanupCost = errorCleanupHours * hourlyRate;
  const totalErrorCost = annualErrorCost + errorCleanupCost;
  const monthlyQueryHours = (inputs.queriesPerMonth * inputs.timePerQuery) / 60;
  const monthlyQueryCost = monthlyQueryHours * hourlyRate;
  const annualQueryCost = monthlyQueryCost * 12;
  const additionalHires = inputs.growthTarget - inputs.currentEmployees;
  const additionalHoursNeeded = (additionalHires * inputs.timePerHire) / 60;
  const needsAdditionalHR = additionalHoursNeeded > 40;
  const additionalHRCost = needsAdditionalHR ? inputs.hrExecutiveSalary * 12 : 0;
  const attritionRiskCost = inputs.replacementCost * 0.1;
  const totalAnnualCost = annualDataEntryCost + totalErrorCost + annualQueryCost + attritionRiskCost;
  const totalWithGrowth = totalAnnualCost + additionalHRCost;
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

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'white',
      padding: '24px'
    },
    maxWidth: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden',
      border: '2px solid #025F4C'
    },
    header: {
      backgroundColor: '#025F4C',
      padding: '32px',
      color: 'white'
    },
    headerFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: 0
    },
    logoContainer: {
      textAlign: 'right'
    },
    logo: {
      height: '48px',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '18px',
      color: '#36D6C3',
      margin: 0
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '32px',
      padding: '32px'
    },
    gridMd: {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#025F4C',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: 0
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    inputCard: {
      backgroundColor: '#f0f9f7',
      border: '2px solid #36D6C3',
      borderRadius: '8px',
      padding: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#025F4C',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '8px 16px',
      border: '2px solid #36D6C3',
      borderRadius: '8px',
      fontSize: '16px',
      color: '#025F4C',
      outline: 'none'
    },
    helperText: {
      fontSize: '12px',
      color: '#595959',
      marginTop: '4px'
    },
    costCard: {
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#fff5f5',
      borderLeft: '4px solid #FF8080'
    },
    costFlex: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px'
    },
    costLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#025F4C',
      margin: 0
    },
    costAmount: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#FF8080',
      margin: 0
    },
    totalCard: {
      padding: '24px',
      borderRadius: '12px',
      backgroundColor: '#FF8080',
      color: 'white'
    },
    totalLabel: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '4px'
    },
    totalAmount: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '0 0 8px 0'
    },
    alertCard: {
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#fffbf0',
      borderLeft: '4px solid #FDD506',
      display: 'flex',
      alignItems: 'start',
      gap: '12px'
    },
    benefitCard: {
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#f0fff8',
      borderLeft: '4px solid #BCDD33'
    },
    benefitAmount: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#BCDD33'
    },
    valueCard: {
      padding: '24px',
      borderRadius: '12px',
      backgroundColor: '#36D6C3',
      color: 'white'
    },
    additionalCard: {
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#f5f0ff',
      borderLeft: '4px solid #A586EF',
      display: 'flex',
      alignItems: 'start',
      gap: '12px'
    },
    bottomLineCard: {
      padding: '24px',
      borderRadius: '12px',
      backgroundColor: '#025F4C',
      color: 'white'
    },
    roiNumber: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#FDD506',
      margin: 0,
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: '2px solid #36D6C3'
    },
    footer: {
      marginTop: '24px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#595959'
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: '8px 0 0 0',
      fontSize: '14px',
      color: '#595959'
    },
    listItem: {
      marginBottom: '4px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.headerFlex}>
              <div style={styles.headerTitle}>
                <Calculator size={32} color="#FDD506" />
                <h1 style={styles.title}>HRMS Integration ROI Calculator</h1>
              </div>
              <div style={styles.logoContainer}>
                <img 
                  src="https://cdn.prod.website-files.com/619b33946e0527b5a12bec15/61f8edaecca71a1ae15ec68b_loop-logo-moss.svg" 
                  alt="Loop" 
                  style={styles.logo}
                />
                <div style={{...styles.subtitle, fontSize: '14px'}}>Powered by Loop</div>
              </div>
            </div>
            <p style={styles.subtitle}>Calculate the real cost of manual insurance administration</p>
          </div>

          <div style={{...styles.grid, ...(window.innerWidth >= 768 ? styles.gridMd : {})}}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <Users size={24} />
                Your Current Situation
              </h2>

              <div style={styles.inputGroup}>
                {[
                  { label: 'New hires per month', field: 'newHiresPerMonth' },
                  { label: 'Time per hire (minutes)', field: 'timePerHire' },
                  { label: 'HR Executive monthly salary (₹)', field: 'hrExecutiveSalary', extra: `Hourly rate: ₹${hourlyRate.toFixed(0)}` },
                  { label: 'Data errors per year', field: 'dataErrorsPerYear' },
                  { label: 'Average cost per error (₹)', field: 'costPerError' },
                  { label: 'Employee queries per month', field: 'queriesPerMonth' },
                  { label: 'Current employee count', field: 'currentEmployees' },
                  { label: 'Growth target (employees)', field: 'growthTarget' }
                ].map(({ label, field, extra }) => (
                  <div key={field} style={styles.inputCard}>
                    <label style={styles.label}>{label}</label>
                    <input
                      type="number"
                      value={inputs[field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      style={styles.input}
                    />
                    {extra && <p style={styles.helperText}>{extra}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                <TrendingUp size={24} color="#FF8080" />
                Your Hidden Costs
              </h2>

              <div style={styles.inputGroup}>
                {[
                  { label: 'Manual Data Entry', hours: monthlyDataEntryHours, amount: annualDataEntryCost },
                  { label: 'Data Errors & Cleanup', extra: `${inputs.dataErrorsPerYear} errors/year`, amount: totalErrorCost },
                  { label: 'Employee Query Handling', hours: monthlyQueryHours, amount: annualQueryCost },
                  { label: 'Attrition Risk', extra: '10% attribution', amount: attritionRiskCost }
                ].map(({ label, hours, extra, amount }) => (
                  <div key={label} style={styles.costCard}>
                    <div style={styles.costFlex}>
                      <div>
                        <p style={styles.costLabel}>{label}</p>
                        <p style={styles.helperText}>
                          {hours ? `${hours.toFixed(1)} hours/month` : extra}
                        </p>
                      </div>
                      <p style={styles.costAmount}>{formatCurrency(amount)}/year</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.totalCard}>
                <p style={styles.totalLabel}>TOTAL ANNUAL COST</p>
                <p style={styles.totalAmount}>{formatCurrency(totalAnnualCost)}</p>
                <p style={{fontSize: '14px', opacity: 0.9, margin: 0}}>What you're paying for manual processes</p>
              </div>

              {needsAdditionalHR && (
                <div style={styles.alertCard}>
                  <AlertCircle size={20} color="#FDD506" style={{flexShrink: 0, marginTop: '2px'}} />
                  <div>
                    <p style={{...styles.costLabel, marginBottom: '8px'}}>Growth Impact Alert</p>
                    <p style={{...styles.helperText, marginBottom: '8px'}}>
                      Growing to {inputs.growthTarget} employees will require <strong>{additionalHoursNeeded.toFixed(0)} additional hours/month</strong>.
                    </p>
                    <p style={{...styles.helperText, marginBottom: '8px'}}>
                      <strong>You'll likely need another HR Executive</strong>
                    </p>
                    <p style={{fontSize: '18px', fontWeight: 'bold', color: '#FDD506', margin: 0}}>
                      Additional cost: {formatCurrency(additionalHRCost)}/year
                    </p>
                  </div>
                </div>
              )}

              <div style={{borderTop: '2px solid #36D6C3', paddingTop: '24px'}}>
                <h3 style={{...styles.sectionTitle, fontSize: '20px', marginBottom: '16px'}}>With HRMS Integration</h3>
                
                <div style={styles.inputGroup}>
                  {[
                    { label: 'Time Savings (65%)', sub: 'Automated data sync', amount: annualTimeSavings },
                    { label: 'Error Elimination (95%)', sub: '99%+ data accuracy', amount: errorReduction }
                  ].map(({ label, sub, amount }) => (
                    <div key={label} style={styles.benefitCard}>
                      <div style={styles.costFlex}>
                        <div>
                          <p style={styles.costLabel}>{label}</p>
                          <p style={styles.helperText}>{sub}</p>
                        </div>
                        <p style={styles.benefitAmount}>{formatCurrency(amount)}/year</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.valueCard}>
                  <p style={styles.totalLabel}>TOTAL ANNUAL VALUE</p>
                  <p style={styles.totalAmount}>{formatCurrency(totalAnnualValue)}</p>
                  <p style={{fontSize: '14px', opacity: 0.9, margin: 0}}>Quantified savings from HRMS integration</p>
                </div>

                <div style={styles.additionalCard}>
                  <CheckCircle size={20} color="#A586EF" style={{flexShrink: 0, marginTop: '2px'}} />
                  <div>
                    <p style={{...styles.costLabel, marginBottom: '8px'}}>Additional Benefits</p>
                    <ul style={styles.list}>
                      <li style={styles.listItem}>• Day-1 healthcare access for employees & families</li>
                      <li style={styles.listItem}>• HR Dashboard for real-time visibility</li>
                      <li style={styles.listItem}>• Instant e-cards and claims via Loop App</li>
                      <li style={styles.listItem}>• Scale to {inputs.growthTarget} without additional HR staff</li>
                      <li style={styles.listItem}>• HR team focuses on strategic initiatives</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={styles.bottomLineCard}>
                <p style={{...styles.totalLabel, color: '#FDD506'}}>THE BOTTOM LINE</p>
                <p style={{fontSize: '16px', margin: '0 0 8px 0'}}>
                  You're currently spending <strong>{formatCurrency(totalAnnualCost)}/year</strong> on manual insurance processes.
                </p>
                {needsAdditionalHR && (
                  <p style={{fontSize: '16px', margin: '0 0 8px 0'}}>
                    With planned growth, this becomes <strong>{formatCurrency(totalWithGrowth)}/year</strong>
                  </p>
                )}
                <p style={{fontSize: '16px', margin: 0}}>
                  HRMS Integration delivers <strong>{formatCurrency(totalAnnualValue)}/year</strong> in quantified value.
                </p>
                <p style={styles.roiNumber}>
                  ROI: {((totalAnnualValue / totalAnnualCost) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <p style={{margin: '0 0 8px 0'}}>All calculations based on client-provided data. Conservative estimates used throughout.</p>
          <p style={{margin: 0}}>Powered by <strong style={{color: '#025F4C'}}>Loop</strong></p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HRMSROICalculator />
  </React.StrictMode>,
)