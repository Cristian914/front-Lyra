import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  Users, Mail, Phone, Calendar, Activity, CheckCircle,
  Search, Filter, SortAsc, Image as ImageIcon
} from 'lucide-react';

export const Pacientes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 novos estados para melhorias
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("nome");

  const loadPatients = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getPatients(user.id);
      setPatients(data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [user.id]);

  useEffect(() => {
    const handleFocus = () => loadPatients();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading) return <LoadingSpinner size="lg" />;

  // 🔹 aplicar busca + filtro + ordenação
  const filteredPatients = patients
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
    )
    .filter(p => statusFilter === "Todos" || p.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === "nome") return a.name.localeCompare(b.name);
      if (sortBy === "idade") return a.age - b.age;
      return 0;
    });

  return (
    <div className="space-y-6 p-4">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-light" aria-label="Ícone de pacientes" />
        <h1 className="text-3xl font-bold text-white">Meus Pacientes</h1>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <p className="text-sm opacity-70">Total</p>
          <p className="text-2xl font-bold">{patients.length}</p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-sm opacity-70">Ativos</p>
          <p className="text-2xl font-bold text-green-600">
            {patients.filter(p => p.status === "Ativo").length}
          </p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-sm opacity-70">Em tratamento</p>
          <p className="text-2xl font-bold text-blue-600">
            {patients.filter(p => p.status === "Em tratamento").length}
          </p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-sm opacity-70">Concluídos</p>
          <p className="text-2xl font-bold text-gray-600">
            {patients.filter(p => p.status === "Concluído").length}
          </p>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 opacity-70" />
          <input
            type="text"
            placeholder="Buscar por nome ou telefone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-64"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 opacity-70" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option>Todos</option>
            <option>Ativo</option>
            <option>Em tratamento</option>
            <option>Concluído</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="w-5 h-5 opacity-70" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="nome">Ordenar por Nome</option>
            <option value="idade">Ordenar por Idade</option>
          </select>
        </div>
      </div>

      {/* Lista de pacientes */}
      <div className="grid gap-6">
        {filteredPatients.length === 0 ? (
          <Card className="text-center py-12">
            <Users className="w-16 h-16 opacity-30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum paciente encontrado</h3>
            <p className="opacity-70">Tente mudar os filtros ou a busca.</p>
          </Card>
        ) : (
          filteredPatients.map(patient => (
            <Card
              key={patient.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/pacientes/${patient.id}`)}
            >
              <div className="space-y-4">
                {/* Avatar com foto ou ícone */}
                <div className="flex items-center gap-4">
                  {patient.photo ? (
                    <img
                      src={patient.photo}
                      alt={`Foto de ${patient.name}`}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-light to-accent rounded-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white" aria-label="Avatar" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{patient.name}</h3>
                    <p className="text-sm opacity-70">Paciente #{patient.id}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 opacity-70" />
                    <div>
                      <p className="text-sm opacity-70">Idade</p>
                      <p className="font-medium">{patient.age} anos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 opacity-70" />
                    <div>
                      <p className="text-sm opacity-70">Data de Nascimento</p>
                      <p className="font-medium">
                        {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 opacity-70" />
                    <div>
                      <p className="text-sm opacity-70">Telefone</p>
                      <a href={`tel:${patient.phone}`} className="font-medium hover:text-light transition-colors">
                        {patient.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 opacity-70" />
                    <div>
                      <p className="text-sm opacity-70">Total de Sessões</p>
                      <p className="font-medium">{patient.totalSessions}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 opacity-70" />
                    <div>
                      <p className="text-sm opacity-70">Status do Tratamento</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Ativo' || patient.status === 'Em tratamento'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 opacity-70" />
                    <div>
                      <p className="text-sm opacity-70">Email</p>
                      <a href={`mailto:${patient.email}`} className="font-medium hover:text-light transition-colors">
                        {patient.email}
                      </a>
                    </div>
                  </div>

                  {/* Próxima consulta */}
                  {patient.nextSession && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 opacity-70" />
                      <div>
                        <p className="text-sm opacity-70">Próxima Sessão</p>
                        <p className="font-medium">
                          {new Date(patient.nextSession).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
