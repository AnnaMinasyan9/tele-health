import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import type { Patient } from "@shared/models";
import { logout, selectCurrentUser } from "@shared/store/auth";
import { getDoctorById, selectDoctor } from "@shared/store/doctor";
import { useAppDispatch, useAppSelector } from "@shared/store/hooks";
import { spacing } from "@shared/theme";
import { DoctorCard, PatientHomeHeader } from "@widgets";

export function PatientHomeScreen() {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);

  const patientId = currentUser?.id;
  const doctorId = (currentUser as Patient).doctorId;

  const doctor = useAppSelector(selectDoctor);

  useEffect(() => {
    if (doctorId) dispatch(getDoctorById(doctorId));
  }, [dispatch, patientId, doctorId]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <PatientHomeHeader
        name={currentUser?.fullName ?? ""}
        onLogout={handleLogout}
      />
      {doctor ? (
        <View style={styles.doctorCardWrapper}>
          <DoctorCard doctor={doctor} label="YOUR DOCTOR" />
        </View>
      ) : null}

    </>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingBottom: spacing.jumboLg },
  rowWrapper: { paddingHorizontal: spacing.xxl },
  doctorCardWrapper: {
    marginHorizontal: spacing.xxl,
    marginTop: spacing.xxl,
  },
});
