import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Users, Calendar, BarChart3 } from 'lucide-react';
export const Relatorios = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState(null);

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const data = await mockApi.getReportsData(user.id);
        setReportsData(data);
      } catch (error) {
        console.error('Erro ao carregar dados dos relatórios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReportsData();
  }, [user.id]);
  if (loading) return <LoadingSpinner size="lg" />;
  if (!reportsData) return <div>Erro ao carregar dados</div>;
  const { stats, frequencyData, statusData, riskAlerts, patientsData } = reportsData;
  const hasNoData = stats.activePatients === 0 && stats.totalSessions === 0;
  return (
    <div className=" min-h-screen p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Relatórios e Analytics</h1>
        <p className="text-[#c2e4f0] mt-1">Acompanhe métricas e indicadores da sua prática</p>
      </div>

      {hasNoData ? (
        <Card className="text-center py-12 border-2 border-dashed border-white/30">
          <BarChart3 className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Relatórios em Construção</h3>
          <p className="text-white/70 mb-4">
            Seus relatórios e analytics aparecerão aqui conforme você atender pacientes e realizar sessões.
          </p>
          <p className="text-sm text-white/50">
            Comece aceitando solicitações de pacientes para gerar dados estatísticos.
          </p>
        </Card>
      ) : (
        <>
          <div className="flex gap-6">
            {/* Cards à esquerda */}
            <div className="grid grid-cols-2 gap-6 w-1/2">
              <Card className="text-center bg-white rounded-xl shadow-md p-6">
                <Users className="w-10 h-10 text-[#0a8cbc] mx-auto mb-2" />
                <h3 className="text-3xl font-bold text-[#0a8cbc]">{stats.activePatients}</h3>
                <p className="text-[#c2e4f0] font-semibold text-sm">Paciente Ativos</p>
              </Card>

              <Card className="text-center bg-white rounded-xl shadow-md p-6">
                <Calendar className="w-10 h-10 text-[#0a8cbc] mx-auto mb-2" />
                <h3 className="text-3xl font-bold text-[#0a8cbc]">{stats.totalSessions}</h3>
                <p className="text-[#c2e4f0] font-semibold text-sm">Sessões de hoje</p>
              </Card>

              <Card className="text-center bg-white rounded-xl shadow-md p-6">
                <TrendingUp className="w-10 h-10 text-green-600 mx-auto mb-2" />
                <h3 className="text-3xl font-bold text-[#0a8cbc]">{stats.attendanceRate}%</h3>
                <p className="text-[#c2e4f0] font-semibold text-sm">Taxa De conclusão</p>
              </Card>

              <Card className="text-center bg-white rounded-xl shadow-md p-6">
                <AlertTriangle className="w-10 h-10 text-red-600 mx-auto mb-2" />
                <h3 className="text-3xl font-bold text-red-600">{stats.riskAlerts}</h3>
                <p className="text-[#c2e4f0] font-semibold text-sm">Sessões de hoje</p>
              </Card>
            </div>

            {/* Gráfico à direita */}
            <Card className="bg-white rounded-xl shadow-md p-6 w-1/2">
              <h2 className="text-xl font-semibold text-[#0a8cbc] mb-4">Frequência de Sessões</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="month" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#2493BF" />
                  
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Resto dos gráficos e alertas podem vir abaixo */}

          <Card className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold text-[#0a8cbc] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Alertas de Risco
            </h2>
            <div className="space-y-3">
              {riskAlerts.length === 0 ? (
                <p className="text-[#c2e4f0] text-center py-4">Nenhum alerta de risco no momento</p>
              ) : (
                riskAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className="flex justify-between items-center p-4 bg-white/10 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-[#0a8cbc]">{alert.patient}</p>
                      <p className="text-sm text-[#c2e4f0]">{alert.reason}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          alert.risk === 'Alto'
                            ? 'bg-red-500/20 text-red-700'
                            : 'bg-yellow-500/20 text-yellow-700'
                        }`}
                      >
                        Risco {alert.risk}
                      </span>
                      <p className="text-xs text-[#c2e4f0] mt-1">
                        {new Date(alert.date).toLocaleDateString('pt-BR')}
                      </p>
                      
                    </div>
                    
                  </div>
                  
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
