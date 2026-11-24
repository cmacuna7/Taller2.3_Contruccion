-- Roles de AulaConecta (Unidad Educativa "Andoas"). Se cargan una vez, después de 01_schema.sql.
-- docker compose exec -T postgres psql -U identidad -d db_identidad < database/02_roles_aulaconecta.sql
INSERT INTO rol (nombre, descripcion) VALUES
    ('ADMIN', 'Vicerrector: configuración, revisión de planificaciones y tablero institucional'),
    ('SECRETARIA', 'Matrícula, nóminas y avisos asistidos'),
    ('DOCENTE', 'Planificación, calificaciones, asistencia y comportamiento'),
    ('REPRESENTANTE', 'Consulta de sus representados y recepción de avisos'),
    ('ESTUDIANTE', 'Consulta de notas, tareas, horario y asistencia')
ON CONFLICT (nombre) DO NOTHING;
