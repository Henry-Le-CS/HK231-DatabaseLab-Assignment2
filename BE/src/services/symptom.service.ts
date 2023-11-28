import _ from 'lodash';

import pool from '../database/database_connection';
import { AddPatientInstanceSymptom } from '../dto/add-patient.dto';
import { HasSymptomInfo, SymptomInfo } from '../types';

async function getPatientInstanceSymptoms(
  patientId: string,
  instanceId: number
): Promise<HasSymptomInfo[]> {
  const { rows } = await pool.query(
    `
  SELECT
    has_symptom.s_id AS "symptomId",
    has_symptom.seriousness AS "seriousness",
    symptom.s_description AS "description"
  FROM has_symptom
  JOIN symptom ON has_symptom.s_id=symptom.s_id
  WHERE has_symptom.unique_number=$1 AND has_symptom.patient_order=$2;
  `,
    [patientId, instanceId]
  );

  return rows;
}

async function getAllSymptoms(): Promise<SymptomInfo[]> {
  const { rows } = await pool.query(`
    SELECT
      s_id AS "symptomId",
      s_description AS "description"
    FROM symptom
    `);
  return rows;
}

async function addPatientInstanceSymptoms(
  patientId: string,
  instanceId: number,
  symptoms: AddPatientInstanceSymptom[]
) {
  if (symptoms.length > 0) {
    await pool.query(
      `
    INSERT INTO has_symptom(unique_number, patient_order, s_id, seriousness)
    VALUES ${_.join(
      _.map(
        symptoms,
        (symp, index) =>
          `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`
      ),
      ', '
    )}
    `,
      _.flatMap(symptoms, (symp) => [patientId, instanceId, symp.symptomId, symp.seriousness])
    );
  }
}

const SymptomService = {
  getPatientInstanceSymptoms,
  getAllSymptoms,
  addPatientInstanceSymptoms
};

export default SymptomService;