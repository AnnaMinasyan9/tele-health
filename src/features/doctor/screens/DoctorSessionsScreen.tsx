import { useCallback, useEffect, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import type { Session } from "@shared/models";
import { selectCurrentUser } from "@shared/store/auth";
import { useAppDispatch, useAppSelector } from "@shared/store/hooks";
import { getSessionsByDoctorId, selectDoctorSessions } from "@shared/store/session";
import { spacing, useStyles, type AppTheme } from "@shared/theme";
import { EmptyState } from "@shared/ui";
import { DoctorSessionsHeader, SessionRow } from "@widgets";

export function DoctorSessionsScreen() {
  const styles = useStyles(createStyles);

  const dispatch = useAppDispatch();

  const doctorId = useAppSelector(selectCurrentUser)?.id;

  useEffect(() => {
    if (!doctorId) return;
    dispatch(getSessionsByDoctorId(doctorId));
  }, [dispatch, doctorId]);

  const sessions = useAppSelector((state) => selectDoctorSessions(state, doctorId));
  const sessionCount = sessions.length;

  const renderItem = useCallback(({ item }: { item: Session }) => {
    return <SessionRow session={item} />;
  }, []);

  const keyExtractor = useCallback((item: Session) => item.id, []);

  const ListEmptyComponent = useMemo(
    () => (
      <EmptyState
        title="No upcoming sessions"
        subtitle="Scheduled sessions will appear here"
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <DoctorSessionsHeader sessionCount={sessionCount} />

      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        contentContainerStyle={styles.list}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: t.colors.background },
    list: { paddingHorizontal: spacing.xxl, paddingVertical: spacing.xxl },
  });
}
