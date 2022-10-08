import unittest


class TestCase(unittest.TestCase):
    # TDD
    def testFunctionTemplate(self):
        self.assertEqual(1, 1)


if __name__ == '__main__':
    unittest.main()
