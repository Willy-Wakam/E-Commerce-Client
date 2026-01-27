import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/store/admin/users";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Dialog} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";

function AdminUsers() {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector((state) => state.adminUsers);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]); // ✅ runs once on mount

    if (isLoading) return <div className="p-6">Loading users...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users && users.length > 0
                            ? users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user?._id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Dialog
                                        >
                                            <Button
                                            >
                                                Change Role
                                            </Button>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                            : null}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default AdminUsers;
